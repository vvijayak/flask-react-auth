import os
from api.models import db, User
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

@api.route('/health', methods=['GET'])
def handle_hello():

    response_body = {
        "status": "ok"
    }

    return jsonify(response_body), 200

@api.route('/token', methods=['post'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if email != 'test' or password != 'test':
        return jsonify({'msg': 'Bad username or password'}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
    