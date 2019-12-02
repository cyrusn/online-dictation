package model_test

import (
	"database/sql"
	"testing"

	"github.com/cyrusn/online-dictation/server/model"
	"github.com/cyrusn/online-dictation/server/model/vocabulary"
	"github.com/stretchr/testify/assert"
)

const (
	DSN = "root@/onlineDictationTestDB"
)

var vocabDB = vocabulary.DB{}

func TestMain(t *testing.T) {
	t.Run("Create Database", createDatabase)
	t.Run("open mysql", OpenSQL)
	t.Run("Test Vocabulary", TestVocabulary)
}

func createDatabase(t *testing.T) {
	err := model.CreateDatabase(DSN, true)
	assert.NoError(t, err, "Unable to create database")
}

func OpenSQL(t *testing.T) {
	db, err := sql.Open("mysql", DSN)
	assert.NoError(t, err, "Unable to connect database")
	vocabDB = vocabulary.DB{DB: db}
}
