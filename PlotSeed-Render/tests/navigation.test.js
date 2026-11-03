import test from 'node:test';
import assert from 'node:assert/strict';
import { beginReviewEdit, finishReviewEdit, missingQuestionIds } from '../src/navigation.js';
import { createDraft, questionsFor, setAnswer } from '../src/questions.js';

test('editing a reviewed question returns directly to the overview and keeps its answer',()=>{
 let draft=createDraft('park');draft.step=20;draft.activeMs=4200;
 draft.answers=Object.fromEntries(questionsFor('park').map(q=>[q.id,null]));
 draft=beginReviewEdit(draft,2);assert.equal(draft.returnToReview,true);assert.equal(draft.step,2);
 draft=setAnswer(draft,'goal',questionsFor('park')[2].options[0]);
 draft=finishReviewEdit(draft);assert.equal(draft.step,20);assert.equal(draft.returnToReview,false);
 assert.equal(draft.answers.goal,questionsFor('park')[2].options[0]);assert.equal(draft.activeMs,4200);
 assert.deepEqual(missingQuestionIds(draft),[]);
});
test('changing a supporting character marks its dependent answer for review',()=>{
 let d=createDraft('park');d.answers=Object.fromEntries(questionsFor('park').map(q=>[q.id,null]));
 d=beginReviewEdit(d,4);d=setAnswer(d,'supporting',questionsFor('park')[4].options[1]);d=finishReviewEdit(d);
 assert.equal(d.step,20);assert.deepEqual(missingQuestionIds(d),['relationship']);
});
