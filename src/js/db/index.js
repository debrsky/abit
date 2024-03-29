import PouchDB from 'pouchdb';

const DB_NAME = 'my_database';

export const db = new PouchDB(DB_NAME);

// const remoteDB = new PouchDB(`http://localhost:5984/${DB_NAME}`);

// db.sync(remoteDB, {live: true, retry: true})
//   // .on('change', function (info) {
//   //   // handle change
//   //   console.log('change', info);
//   // })
//   // .on('paused', function (err) {
//   //   // replication paused (e.g. replication up to date, user went offline)
//   //   console.log('paused', err);
//   // })
//   // .on('active', function () {
//   //   // replicate resumed (e.g. new changes replicating, user went back online)
//   //   console.log('active');
//   // })
//   .on('denied', function (err) {
//     // a document failed to replicate (e.g. due to permissions)
//     console.log('denied', err);
//   })
//   .on('complete', function (info) {
//     // handle complete
//     console.log('complete', info);
//   })
//   .on('error', function (err) {
//     // handle error
//     console.log('error', err);
//   });

const dbChanges = {
  handlers: new Set(),
  subscribe(handler) {
    this.handlers.add(handler);
  },
  unsubscribe(handler) {
    return this.handlers.delete(handler);
  },
  handle(change) {
    for (const handler of this.handlers) {
      handler(change);
    }
  }
};

db.changes({
  filter: function (doc) {
    return true;
  },
  since: 'now',
  live: true,
  include_docs: true,
  conflicts: true
})
  .on('change', (change) => dbChanges.handle(change))
  .on('error', function (err) {
    console.log(err);
  });

export const subscribe = (handler) => dbChanges.subscribe(handler);
export const unsubscribe = (handler) => dbChanges.unsubscribe(handler);
