# yuruboo
GPSをもとにしてすぐに遊びにゆく友達を探すゆるぼアプリ

# ER図
```mermaid
erDiagram
  user ||--o{ gathering : "ユーザと募集は一対多"
  user ||--o{ message : "ユーザとメッセージは一対多"
  user ||--o{ participation : "ユーザと参加は一対多"
  genre ||--o{ gathering : "ジャンルと募集は一対多"
  gathering ||--o{ message : "募集とメッセージは一対多"
  gathering ||--o{ participation : "募集と参加は一対多"
  
  user {
    bigint id PK "User ID"
    string name "名前"
    string profile "プロフィール"
  }

  genre {
    bigint id PK "Genre ID"
    string name "ジャンル名"
    image icon "アイコン"
  }

  gathering {
    bigint id PK "Gathering ID"
    integer pos_lat "募集場所_緯度"
    integer pos_lng "募集場所_経度"
    user host FK "募集者"
    genre genre FK "ジャンル"
    string body "本文"
    integer num_participant "人数"
    timestamp created_at "募集開始日時"
  }

  message {
    bigint id PK "Message ID"
    gathering gathering FK "募集"
    string body "本文"
    user sender FK "送り手"
    timestamp created_at "投稿日時"
  }

  participation {
    bigint id PK "Participation ID"
    gathering gathering FK "募集"
    user participant FK "参加者"
  }
```
