require('dotenv').config();
const { Sequelize } = require('sequelize');
function normalizeParams(params) {
  if (!params) return [];
  if (Array.isArray(params)) return params;
  if (typeof params === 'object') {
    const normalized = {};
    for (const [key, value] of Object.entries(params)) {
      const cleanKey = key.replace(/^[$:@]/, '');
      normalized[cleanKey] = value;
      normalized[key] = value;
    }
    return normalized;
  }
  return params;
}

function createBetterSqlite3Adapter() {
  let Database;
  try {
    Database = require('better-sqlite3');
  } catch (err) {
    try {
      return require('sqlite3').verbose();
    } catch (_e) {
      throw new Error("Neither 'better-sqlite3' nor 'sqlite3' is installed: " + err.message);
    }
  }

  class DatabaseAdapter {
    constructor(filename, mode, callback) {
      if (typeof mode === 'function') {
        callback = mode;
      }
      try {
        this.db = new Database(filename);
        this.db.pragma('journal_mode = WAL');
        if (callback) process.nextTick(() => callback(null));
      } catch (err) {
        if (callback) process.nextTick(() => callback(err));
      }
    }

    serialize(fn) {
      if (fn) fn();
    }

    close(callback) {
      try {
        this.db.close();
        if (callback) process.nextTick(() => callback(null));
      } catch (err) {
        if (callback) process.nextTick(() => callback(err));
      }
    }

    run(sql, params, callback) {
      if (typeof params === 'function') {
        callback = params;
        params = [];
      }
      try {
        const p = normalizeParams(params);
        const stmt = this.db.prepare(sql);
        let rows = [];
        let info = { changes: 0, lastInsertRowid: 0 };
        if (stmt.reader) {
          rows = Array.isArray(p) ? stmt.all(...p) : stmt.all(p);
        } else {
          info = Array.isArray(p) ? stmt.run(...p) : stmt.run(p);
        }
        const ctx = { lastID: Number(info.lastInsertRowid || 0), changes: info.changes || 0 };
        if (callback) process.nextTick(() => callback.call(ctx, null, rows));
      } catch (err) {
        if (callback) process.nextTick(() => callback(err));
      }
    }

    all(sql, params, callback) {
      if (typeof params === 'function') {
        callback = params;
        params = [];
      }
      try {
        const p = normalizeParams(params);
        const stmt = this.db.prepare(sql);
        let rows = [];
        let info = { changes: 0, lastInsertRowid: 0 };
        if (stmt.reader) {
          rows = Array.isArray(p) ? stmt.all(...p) : stmt.all(p);
        } else {
          info = Array.isArray(p) ? stmt.run(...p) : stmt.run(p);
        }
        const ctx = { lastID: Number(info.lastInsertRowid || 0), changes: info.changes || 0 };
        if (callback) process.nextTick(() => callback.call(ctx, null, rows));
      } catch (err) {
        if (callback) process.nextTick(() => callback(err));
      }
    }

    get(sql, params, callback) {
      if (typeof params === 'function') {
        callback = params;
        params = [];
      }
      try {
        const p = normalizeParams(params);
        const stmt = this.db.prepare(sql);
        const row = stmt.reader 
          ? (Array.isArray(p) ? stmt.get(...p) : stmt.get(p))
          : null;
        if (callback) process.nextTick(() => callback.call({}, null, row));
      } catch (err) {
        if (callback) process.nextTick(() => callback(err));
      }
    }
  }

  return {
    Database: DatabaseAdapter,
    OPEN_READONLY: 1,
    OPEN_READWRITE: 2,
    OPEN_CREATE: 4
  };
}

const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
      }
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false,
      dialectModule: createBetterSqlite3Adapter()
    });

module.exports = sequelize;
