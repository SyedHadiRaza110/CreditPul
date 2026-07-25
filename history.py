from flask import Blueprint, jsonify, request
from auth import get_db, token_required

history_bp = Blueprint('history', __name__)


@history_bp.route('/history', methods=['GET'])
@token_required
def get_history():
    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, score, loan_limit, interest_rate, created_at "
                "FROM score_history WHERE user_id=%s ORDER BY created_at DESC",
                (request.user_id,)
            )
            rows = cur.fetchall()
        return jsonify(rows), 200
    finally:
        conn.close()
