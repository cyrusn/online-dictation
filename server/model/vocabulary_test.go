package model_test

import (
	"fmt"
	"testing"

	"github.com/cyrusn/online-dictation/server/model/vocabulary"
	"github.com/stretchr/testify/assert"
)

var filenames = []string{
	"ENG-L1-1",
	"ENG-L1-2",
}

func TestVocabulary(t *testing.T) {
	t.Run("Import Vocabularies", ImportVocabularies(&vocabDB))
	t.Run("List Quizzes", listQuizzes(&vocabDB))
}

func listQuizzes(db *vocabulary.DB) func(*testing.T) {
	return func(t *testing.T) {
		quizzes, err := db.ListQuizzes()
		assert.EqualValues(t, quizzes, filenames)
		assert.NoError(t, err, "Unable to list quiz")
	}
}
func ImportVocabularies(db *vocabulary.DB) func(*testing.T) {
	return func(t *testing.T) {

		for _, filename := range filenames {
			importVocabulariesByJSON("../../data/"+filename+".json", db)(t)
		}
	}
}

func importVocabulariesByJSON(filename string, db *vocabulary.DB) func(t *testing.T) {
	return func(t *testing.T) {
		err := db.ImportQuiz(filename)
		assert.NoError(t, err, fmt.Sprintf("Unable to import quiz"))
	}
}
