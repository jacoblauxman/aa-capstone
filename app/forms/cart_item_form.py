from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length

class CartItemForm(FlaskForm):
  quantity = IntegerField('quantity', validators=[DataRequired(), NumberRange(min=1, max=10)])
  submit = SubmitField("update cart")
