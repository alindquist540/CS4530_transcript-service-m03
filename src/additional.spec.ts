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
});
