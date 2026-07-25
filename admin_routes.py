from flask import Blueprint, jsonify, request
from auth import get_db, token_required

admin_bp = Blueprint('admin', __name__)


def admin_required(f):
    from functools import wraps

    @wraps(f)
    def decorated(*args, **kwargs):
        if getattr(request, 'user_role', None) != 'admin':
            return jsonify({"error": "Admin access only"}), 403
        return f(*args, **kwargs)
    return decorated


@admin_bp.route('/admin/users', methods=['GET'])
@token_required
@admin_required
def list_users():
    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id, name, email, role, created_at FROM users")
            users = cur.fetchall()
        return jsonify(users), 200
    finally:
        conn.close()


@admin_bp.route('/admin/scores', methods=['GET'])
@token_required
@admin_required
def list_all_scores():
    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT sh.id, u.name, u.email, sh.score, sh.loan_limit,
                       sh.interest_rate, sh.created_at
                FROM score_history sh
                JOIN users u ON sh.user_id = u.id
                ORDER BY sh.created_at DESC
            """)
            scores = cur.fetchall()
        return jsonify(scores), 200
    finally:
        conn.close()
