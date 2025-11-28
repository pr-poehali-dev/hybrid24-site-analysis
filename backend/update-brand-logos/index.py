import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обновляет логотипы всех брендов в базе данных с carlogos.org
    Args: event - HTTP запрос, context - контекст выполнения
    Returns: HTTP response с результатом
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'DATABASE_URL not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    logos_map = {
        'toyota': 'https://www.carlogos.org/logo/Toyota-logo-1989-3700x1200.png',
        'honda': 'https://www.carlogos.org/logo/Honda-logo-1990-2560x1440.png',
        'nissan': 'https://www.carlogos.org/logo/Nissan-logo-2013-1440x900.png',
        'lexus': 'https://www.carlogos.org/logo/Lexus-logo-1988-1440x900.png',
        'mazda': 'https://www.carlogos.org/logo/Mazda-logo-1997-1440x900.png',
        'mitsubishi': 'https://www.carlogos.org/logo/Mitsubishi-logo-1990-2560x1440.png',
        'subaru': 'https://www.carlogos.org/logo/Subaru-logo-2003-2560x1440.png',
        'suzuki': 'https://www.carlogos.org/logo/Suzuki-logo-5000x2500.png',
        'acura': 'https://www.carlogos.org/logo/Acura-logo-2560x1440.png',
        'hyundai': 'https://www.carlogos.org/logo/Hyundai-logo-2011-1440x900.png',
        'kia': 'https://www.carlogos.org/logo/Kia-logo-2560x1440.png',
        'haval': 'https://www.carlogos.org/logo/Haval-logo-2013-2560x1440.png',
        'geely': 'https://www.carlogos.org/logo/Geely-logo-2560x1440.png',
        'changan': 'https://www.carlogos.org/logo/Changan-logo-2010-2560x1440.png',
        'belgee': 'https://www.carlogos.org/logo/Belgee-logo-2560x1440.png',
        'lifan': 'https://www.carlogos.org/logo/Lifan-logo-2560x1440.png',
        'jetour': 'https://www.carlogos.org/logo/Jetour-logo-2018-2560x1440.png',
        'tank': 'https://www.carlogos.org/logo/Tank-logo-2560x1440.png',
        'exeed': 'https://www.carlogos.org/logo/Exeed-logo-2017-2560x1440.png',
        'omoda': 'https://www.carlogos.org/logo/Omoda-logo-2560x1440.png',
        'gac': 'https://www.carlogos.org/logo/GAC-logo-2560x1440.png',
        'li auto': 'https://www.carlogos.org/logo/Li-Auto-logo-2560x1440.png',
        'jac': 'https://www.carlogos.org/logo/JAC-logo-2560x1440.png',
        'voyah': 'https://www.carlogos.org/logo/Voyah-logo-2560x1440.png',
        'zeekr': 'https://www.carlogos.org/logo/Zeekr-logo-2021-2560x1440.png',
        'hongqi': 'https://www.carlogos.org/logo/Hongqi-logo-2018-2560x1440.png',
        'faw': 'https://www.carlogos.org/logo/FAW-logo-2560x1440.png',
        'dongfeng': 'https://www.carlogos.org/logo/Dongfeng-logo-2560x1440.png',
        'jaecoo': 'https://www.carlogos.org/logo/Jaecoo-logo-2560x1440.png',
        'bestune': 'https://www.carlogos.org/logo/Bestune-logo-2560x1440.png',
        'chery': 'https://www.carlogos.org/logo/Chery-logo-2013-2560x1440.png'
    }
    
    updated_count = 0
    
    for slug, logo_url in logos_map.items():
        cur.execute(
            "UPDATE brands SET logo_url = %s WHERE slug = %s",
            (logo_url, slug)
        )
        if cur.rowcount > 0:
            updated_count += 1
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'message': f'Обновлено логотипов: {updated_count}',
            'updated_count': updated_count
        })
    }