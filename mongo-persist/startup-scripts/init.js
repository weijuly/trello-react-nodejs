db = db.getSiblingDB('trello');
db.createUser({
    user: 'trello',
    pwd: 'password',
    roles: [{
        role: 'readWrite',
        db: 'trello'
    }]
});
db.trello.insert({
	id: 'card-01',
	header: 'Task 01',
	description: 'task description',
	due: new Date(),
	state: 'b',
	owner: 'gganesan'
});
db.trello.insert({
	id: 'card-02',
	header: 'Task 02',
	description: 'task description',
	due: new Date(),
	state: 'b',
	owner: 'sthirugnanansamba'
});