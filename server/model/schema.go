package model

import "errors"

type schema struct {
	name    string
	content string
}

// ErrDatabaseExist is the error when database is exists.
var ErrDatabaseExist = errors.New("Database exists")

const credentialTableSchema = `
CREATE TABLE IF NOT EXISTS Credential (
  userAlias varchar(64) NOT NULL,
  password BLOB(128) NOT NULL,
	role varchar(64) NOT NULL,
	PRIMARY KEY (userAlias)
);`

const vocabularyTableSchema = `
CREATE TABLE IF NOT EXISTS Vocabulary (
	id INTEGER NOT NULL AUTO_INCREMENT,
  title varchar(64),
  part_of_speech varchar(64),
  definition varchar(64),
	quiz varchar(64),
	PRIMARY KEY (id)
	);`

const reportTableSchema = `
CREATE TABLE IF NOT EXISTS Report (
	id INTEGER NOT NULL AUTO_INCREMENT,
	userAlias varchar(64),
	schoolYear INTEGER,
	timestamp TIMESTAMP,
	percentage float,	
	quiz varchar(64),
	PRIMARY KEY (id),
	FOREIGN KEY (userAlias) REFERENCES Credential(userAlias)
);`

const answerTableSchema = `
CREATE TABLE IF NOT EXISTS Answer (
	reportID INTEGER NOT NULL,
	userAlias varchar(64),
	timestamp TIMESTAMP,
	quiz varchar(64),
	answer varchar(64),
	FOREIGN KEY (reportID) REFERENCES Report(id),
	FOREIGN KEY (userAlias) REFERENCES Credential(userAlias)
);`

var schemas = []schema{
	schema{"CREDENTIAL", credentialTableSchema},
	schema{"VOCABULARY", vocabularyTableSchema},
	schema{"REPORT", reportTableSchema},
	schema{"Answer", answerTableSchema},
}
