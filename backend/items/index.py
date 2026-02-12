'''API для управления объявлениями'''
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

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
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            category = params.get('category')
            
            if category and category != 'all':
                cur.execute(
                    """SELECT i.*, u.full_name as owner, u.rating as owner_rating, u.reviews_count as owner_reviews
                       FROM items i
                       JOIN users u ON i.user_id = u.id
                       WHERE i.is_active = true AND i.category_id = %s
                       ORDER BY i.created_at DESC""",
                    (category,)
                )
            else:
                cur.execute(
                    """SELECT i.*, u.full_name as owner, u.rating as owner_rating, u.reviews_count as owner_reviews
                       FROM items i
                       JOIN users u ON i.user_id = u.id
                       WHERE i.is_active = true
                       ORDER BY i.created_at DESC"""
                )
            
            items = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(item) for item in items], default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
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
            
            cur.execute(
                """INSERT INTO items (user_id, title, description, category_id, price, period, location, condition, image_url, features, rules)
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id""",
                (
                    user_id,
                    body['title'],
                    body.get('description', ''),
                    body['category_id'],
                    body['price'],
                    body.get('period', 'день'),
                    body.get('location', ''),
                    body.get('condition', 'Хорошее'),
                    body.get('image_url', ''),
                    body.get('features', []),
                    body.get('rules', [])
                )
            )
            item_id = cur.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'item_id': item_id}),
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