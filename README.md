

# Bot Discord The Isle Legacy
ฺBot Discord ที่ช่วยในการดูแลเซิร์ฟเวอร์ The Isle ของคุณเพื่อลดเวลาในการทำงานลง




## ความต้องการ

* NodeJS^18

## วิธีการติดตั้ง
Clone โปรเจค

```bash
  git clone https://github.com/NatthapoomSomsuk/Discord_Bot_Isle_Legacy_TH.git
```

ไปยังที่อยู่ โปรเจค

```bash
  cd Discord_Bot_Isle_Legacy_TH
```

ทำการคลิกไฟล์ install.bat หรือทำการใช้คำสั่ง

```bash
  npm install
```


## การตั้งค่าเพื่อใช้งาน
* ตั้งค่า  prefix เพื่อทำการเรียกใช้งาน bot โดยจะอยู่ในไฟล์ bot.js
```
global.prefix = "d!"
```
* ไปยังไฟล์ config.js ที่อยู่ภายในโฟลเดอร์ config และทำการตั้งค่า token bot discord
 [Discord Applications](https://discord.com/developers/applications)
```javascript
module.exports = {
    userdatabasepath: `<DIR FILES DATA PLAYER>`,//ตำแหน่งไฟล์ข้อมูล ผู้เล่น
    token: "<TOKEN BOT>", //โทเคนบอท Discord
}
```
* หากว่าต้องการตั้งค่าและสร้างข้อมูล ไดโนเสาร์ไปที่โฟลเดอร์ config > dinos ทำการสร้างไฟล์ข้อมูล ไดโนเสาร์ 

* หากว่าต้องการตั้งค่าการซื้อขาย ไดโนเสาร์ สามารถไปยังไฟล์ที่อยู่ในโฟลเดอร์ config ที่มีชื่อว่า price.json โดยชื่อไดโนเสาร์ จะต้องตรงกับชื่อไฟล์ที่อยู่ใน โฟลเดอร์ config > dinos
```json
    "Taco": {
        "buy": 50,
        "sell": 0
    },
```

## คำสั่งทั้งหมด

| คำสั่ง                | การใช้งาน            |ตำแหน่ง            |
|-----------------------|---------------------|---------------------|
| help               | แสดงคำสั่งที่มีทั้งหมด             | ทุกตำแหน่ง |
| cm | สำหรับดูโครโมโซม | ทุกตำแหน่ง |
| register (UID Steam) |  สำหรับลงชื่อเข้าใช้งาร Bot | ทุกตำแหน่ง |
|sell | สำหรับขายไดโนเสาร์|ทุกตำแหน่ง |
|buydino (ชื่อไดโนเสาร์) (เพศ male, female) | สำหรับซื้อไดโนเสาร์|ทุกตำแหน่ง |
|profile | สำหรับดูไดโนเสาร์ใน Server |ทุกตำแหน่ง |
|viewslot | สำหรับดูข้อมูลใน slot ที่บันทึกไว้|ทุกตำแหน่ง |
|saveslot ช่อง slot)| สำหรับเซฟไดโนเสาร์|ทุกตำแหน่ง |
|loadslot ช่อง slot)| สำหรับโหลดไดโนเสาร์เข้า Server |ทุกตำแหน่ง |
|slay | สำหรับลบตัวละครออกจาก Server |ทุกตำแหน่ง |
|leaderboard| สำหรับดูคนสะสมพ้อยมากที่สุด|ทุกตำแหน่ง |
|addpoint (tag) (จำนวนพ้อย)| สำหรับเพิ่มพ้อย|ผู้ดูแล |
|removepoint (tag) (จำนวนพ้อย)| สำหรับลบพ้อย|ผู้ดูแล |
|reuid (tag)| สำหรับ reuid ผู้เล่น|ผู้ดูแล |
|resetpoint (tag)| สำหรับปรับพ้อย เป็น 0|ผู้ดูแล |



