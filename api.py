from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expense_tracker.db'
db = SQLAlchemy(app)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255))
    amount = db.Column(db.Float)
    date = db.Column(db.DateTime)

db.create_all()

@app.route('/expenses', methods=['POST'])
def create_expense():
    data = request.get_json()
    expense = Expense(description=data['description'], amount=data['amount'], date=datetime.utcnow())
    db.session.add(expense)
    db.session.commit()
    return jsonify({'id': expense.id}), 201

@app.route('/expenses/<int:expense_id>', methods=['GET'])
def get_expense(expense_id):
    expense = Expense.query.get(expense_id)
    if not expense:
        return jsonify({'error': 'Expense not found'}), 404
    return jsonify({
        'id': expense.id,
        'description': expense.description,
        'amount': expense.amount,
        'date': expense.date
    })

@app.route('/expenses/<int:expense_id>', methods=['PUT'])
def update_expense(expense_id):
    expense = Expense.query.get(expense_id)
    if not expense:
        return jsonify({'error': 'Expense not found'}), 404
    data = request.get_json()
    expense.description = data['description']
    expense.amount = data['amount']
    db.session.commit()
    return jsonify({'id': expense.id}), 200

@app.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    expense = Expense.query.get(expense_id)
    if not expense:
        return jsonify({'error': 'Expense not found'}), 404
    db.session.delete(expense)
    db.session.commit()
    return jsonify({'id': expense.id}), 200
