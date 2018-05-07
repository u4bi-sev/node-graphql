## node graphql

### server
```
npm install
npm start
```

### client(CORS)
```
http://127.0.0.1:5500/client/index.html
```

### API
| Field                     | Schema    | QUERY                                                         |
|---------------------------|-----------|---------------------------------------------------------------|
| user                      | RootQuery | `{ user(id : "1") { id } }`                                   |
| users                     | RootQuery | `{ users{ id, name, email, age } }`                           |
| addUser                   | Mutation  | `mutation{ addUser( name : "", email : "", age : 13){ id } }` |
| updateUser                | Mutation  | `mutation{ updateUser(id : "1" , age : 15 ){ id } }`          |
| removeUser                | Mutation  | `mutation{ removeUser(id : "1"){ id } }`                      |

### Schema
```sql
User {
    "id"    : "String",
    "name"  : "String",
    "email" : "String",
    "age"   : "Number"
}
```

> requirements
> * graphql
> * apollo-server-restify
> * restify
> * restify-cors-middleware
> * axios (client)