package vocabulary

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"path/filepath"
	"strings"
)

// Vocabulary is the structure for the vocabulary.
type Vocabulary struct {
	ID           int    `json:"_id"`
	Title        string `json:"title"`
	PartOfSpeech string `json:"partOfSpeech"`
	Definition   string `json:"definition"`
	Quiz         string `json:"quiz"`
}

// DB is sql database
type DB struct {
	*sql.DB
}

// // Quiz is filename of the vocabulary.
// type Quiz struct {
// 	Name string
// }

// ListQuizzes lists all quiz
func (db *DB) ListQuizzes() ([]string, error) {
	// quizzes := []string{}
	rows, err := db.Query("SELECT DISTINCT quiz FROM Vocabulary")
	if err != nil {
		return []string{}, err
	}
	defer rows.Close()

	var quizzes = []string{}

	for rows.Next() {
		var (
			quiz string
		)
		if err := rows.Scan(&quiz); err != nil {
			return quizzes, err
		}
		quizzes = append(quizzes, quiz)
	}
	return quizzes, err
}

// ImportQuiz saves all vocabularies of a quiz to database.
// where path is the location of quiz in json format.
func (db *DB) ImportQuiz(path string) error {
	jsonFile, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}

	vocabularies := []Vocabulary{}

	if err := json.Unmarshal([]byte(jsonFile), &vocabularies); err != nil {
		return err
	}

	for _, v := range vocabularies {
		filename := strings.TrimSuffix(filepath.Base(path), ".json")
		v.Quiz = filename
		if err := db.Insert(&v); err != nil {
			return err
		}
	}
	return nil
}

// Insert saves the vocabulary to database.
func (db *DB) Insert(v *Vocabulary) error {

	_, err := db.Exec(
		`INSERT INTO Vocabulary (
      title,
      part_of_speech,
			definition,
			quiz
    ) values (?, ?, ?,?)`,
		v.Title,
		v.PartOfSpeech,
		v.Definition,
		v.Quiz,
	)

	return err
}
