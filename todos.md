### general


### Delivery feeds service

- [x] install mongoose
- [x] implement logic to get data from google to raw table

- [ ] implement logic to get additional information from internet:
  - [ ] try to understand if is a develiry or not:
    - [ ] check the ifood page-> if have ifood, set as delivery = yes and make it active in the system (on google search for site:ifood.com.br $restaurante $cidade)
    - [ ] in ifood, get the name, description, rating, rate to delivery, schedules to deliver
    - [ ] check for google results and get contacts, website, rating on the web
    - [ ] check for facebook page - about page, and get the contact, phone, website, whatsapp; rating in facebook
    - [ ] in facebook, get the email if exists - send email to the establishment requesting them to inform if they are a deliverable or not and claim for the record;
    - [ ] in facebook, get the last 3 posts (this needs to be a job that rns more frequently);
  - [ ] owner of the establishment -> having the owner will allow the user to claim for the record or event request to delete;
  - [ ] contacts: phone, whatsapp, website

- [ ] implement logic to save data from raw table to shops table

### Adonis BackEnd

- [ ] Implement filters to shops
  - [ ] by CityId (one)
  - [ ] by segmentId (one)
  - [ ] by geoLocation (lat, lng)
  - [ ] by text search
