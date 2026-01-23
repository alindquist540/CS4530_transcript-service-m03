import { beforeEach, describe, expect, it } from 'vitest';
import { TranscriptDB, type TranscriptService } from './transcript.service.ts';

let db: TranscriptService;
beforeEach(() => {
  db = new TranscriptDB();
});

describe('addStudent', () => {
  it('should initialize a blank array for grades of a new student', () => {
    const id1 = db.addStudent('blair');
    const transcript = db.getTranscript(id1);
    // check if grades array is empty for new student
    expect(transcript).toStrictEqual({
      student: { studentID: id1, studentName: 'blair' },
      grades: [],
    });
  });
  it('should not allow negative ids', () => {
    const id1 = db.addStudent('blair');
    expect(id1).toBeGreaterThanOrEqual(1);
  });
});

describe('nameToIDs', () => {
  it('should only return ids associated with the name of the student', () => {
    const id1 = db.addStudent('blair');
    const id2 = db.addStudent('blair');
    db.addStudent('tom');

    expect(db.nameToIDs('blair')).toStrictEqual([id1, id2]);
  });
  it('should not return the entire ids list for all students when some have different name', () => {
    const id1 = db.addStudent('Alex');
    const id2 = db.addStudent('Alex');
    const id3 = db.addStudent('Horne');
    const id4 = db.addStudent('David');
    expect(db.getAllStudentIDs()).toStrictEqual([id1, id2, id3, id4]);

    expect(db.nameToIDs('Alex')).not.toStrictEqual([id1, id2, id3, id4]);
  });
});

/**
 * The stryker mutation on line 70 is innocuous since it still correctly throw an error, the error
 * message is just different. The specification also did not specified the specific error message
 * that _getIndexForId should throw.
 */
