from src import DB

class Base(DB.Model):

    __abstract__ = True

    id = DB.Column(DB.Integer, primary_key=True)
    date_created = DB.Column(DB.DateTime, default=DB.func.current_timestamp())
    date_modified = DB.Column(DB.DateTime,
                              default=DB.func.current_timestamp(),
                              onupdate=DB.func.current_timestamp())
class Dataset(Base):
    __tablename__ = 'datasets'
    name = DB.Column(DB.Text(), nullable=False)
    description = DB.Column(DB.Text(), nullable=False)
    source = DB.Column(DB.Text(), nullable=False)
    date = DB.Column(DB.Float(), nullable=False)
    path = DB.Column(DB.Text(), nullable=False)
    personal =  DB.Column(DB.Boolean(), nullable=False)
    userSubmitted = DB.Column(DB.Boolean(), nullable=False)

    # New instance instantiation procedure
    def __init__(self, name, description, source, path, date, personal, userSubmitted):
        self.name = name
        self.description = description
        self.source = source
        self.date = date
        self.path = path
        self.personal= personal
        self.userSubmitted = userSubmitted

    def to_dict(self):
        return dict(id=self.id,
                    name=self.name,
                    description=self.description,
                    source=self.source,
                    path=self.path,
                    date=self.date,
                    personal=self.personal,
                    userSubmitted=self.userSubmitted)

#DB.drop_all()
DB.create_all()