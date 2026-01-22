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
});
