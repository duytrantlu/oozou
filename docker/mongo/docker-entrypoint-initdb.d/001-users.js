db.createUser(
  {
    user: 'root',
    pwd: 'root',
    roles: [
      {
        role: 'readWrite',
        db:   'nest_development'
      }
    ]
  }
);
