from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class ItemSearchForm(FlaskForm):
  search = StringField('search', validators=[DataRequired(), Length(min=1, max=200)])
  submit = SubmitField('submit')
