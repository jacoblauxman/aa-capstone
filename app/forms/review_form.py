from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length

class ReviewForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(), Length(min=5, max=25)])
  review = TextAreaField('review', validators=[DataRequired(), Length(min=25, max=255)])
  rating = IntegerField('rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
  submit = SubmitField("add review")


# do we need to add in a decimal field - or change the backend to float??
