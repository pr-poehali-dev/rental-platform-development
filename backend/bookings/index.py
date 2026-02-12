'''API для управления бронированиями'''
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def get_db_connection():
    dsn = os.environ['DATABASE_URL']
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(dsn, options=f'-c search_path={schema}')
    return conn

def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            token = event['headers'].get('X-Authorization', '').replace('Bearer ', '')
            
            if not token:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуется авторизация'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "SELECT user_id FROM user_sessions WHERE session_token = %s AND expires_at > NOW()",
                (token,)
            )
            session = cur.fetchone()
            
            if not session:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Сессия истекла'}),
                    'isBase64Encoded': False
                }
            
            user_id = session['user_id']
            item_id = body['item_id']
            start_date = body['start_date']
            end_date = body['end_date']
            
            start = datetime.strptime(start_date, '%Y-%m-%d')
            end = datetime.strptime(end_date, '%Y-%m-%d')
            total_days = (end - start).days + 1
            
            cur.execute("SELECT price FROM items WHERE id = %s", (item_id,))
            item = cur.fetchone()
            total_price = item['price'] * total_days
            
            cur.execute(
                """INSERT INTO bookings (item_id, user_id, start_date, end_date, total_days, total_price, status)
                   VALUES (%s, %s, %s, %s, %s, %s, 'pending') RETURNING id""",
                (item_id, user_id, start_date, end_date, total_days, total_price)
            )
            booking_id = cur.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'booking_id': booking_id, 'total_price': total_price}),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            token = event['headers'].get('X-Authorization', '').replace('Bearer ', '')
            
            if not token:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуется авторизация'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "SELECT user_id FROM user_sessions WHERE session_token = %s AND expires_at > NOW()",
                (token,)
            )
            session = cur.fetchone()
            
            if not session:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Сессия истекла'}),
                    'isBase64Encoded': False
                }
            
            user_id = session['user_id']
            
            cur.execute(
                """SELECT b.*, i.title, i.image_url, i.location, u.full_name as owner_name
                   FROM bookings b
                   JOIN items i ON b.item_id = i.id
                   JOIN users u ON i.user_id = u.id
                   WHERE b.user_id = %s
                   ORDER BY b.created_at DESC""",
                (user_id,)
            )
            bookings = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(b) for b in bookings], default=str),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()