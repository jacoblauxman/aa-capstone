from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length, Regexp, ValidationError


class OrderForm(FlaskForm):
  street = StringField('street', validators=[DataRequired(), Length(min=5, max=50)])
  city = StringField('city', validators=[DataRequired(), Length(min=3, max=50)])
  state = StringField('state', validators=[DataRequired(), Length(min=2, max=2)])
  zipcode = StringField('zipcode', validators=[DataRequired(), Length(min=5, max=5, message='Please provide 5 digit zip')])
  submit = SubmitField('complete purchase')

  def validate_zipcode(form, field):
    if field.data.isnumeric():
      return
    else:
      raise ValidationError('Input must be valid zipcode / numeric')
