# TASK I

#### Database Design
1. User:
    - name (*type: String*)
    - email (*type: String, email format, unique*)
    - username (*type: String, unique*)
    - password (*type: String, random string alphanumeric*)
    - phone (*type: String*)
    - gender (*type; String*)
    - actived_at (*type: Date, nullable*)
    - activation_token (*type: String, nullable*)
    - created_at (*type: Date*)
    - updated_at (*type: Date*)
    - deleted_at (*type: Date, nullable*)

2. Role:
    - name (*type: String*)
    - permissions (*type: Array, nullable*)
    - created_at (*type: Date*)
    - updated_at (*type: Date*)
    - deleted_at (*type: Date, nullable*)

3. City:
    - name (*type: String*)
    - description (*type: String, nullable*)
    - created_at (*type: Date*)
    - updated_at (*type: Date*)
    - deleted_at (*type: Date, nullable*)

4. Hospital
    - name (*type: String*)
    - address (*type: String*)
    - phone (*type: String*)
    - city_id (*type: String, reference to __City__*)
    - created_at (*type: Date*)
    - updated_at (*type: Date*)
    - deleted_at (*type: Date, nullable*)

5. Password
    - email (*type: String, email format, unique*)
    - token (*type: String, random string, unique*)
    - created_at (*type: Date*)

6. User Role
    - user_id (*type: String, reference to __User__*)
    - role_id (*type: String, reference to __Role__*)
