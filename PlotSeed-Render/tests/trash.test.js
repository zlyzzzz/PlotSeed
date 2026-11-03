import test from 'node:test';
import assert from 'node:assert/strict';
import {moveToTrash,restoreFromTrash} from '../src/library.js';
import {createDraft} from '../src/questions.js';
test('moving a record to trash preserves its content and other records; restore recovers it',()=>{
 const a={...createDraft('park'),story:'My saved story'},b=createDraft('restaurant');
 const trashed=moveToTrash([a,b],a.id);
 assert.ok(trashed[0].deletedAt);assert.equal(trashed[0].story,'My saved story');assert.equal(trashed[1].deletedAt,undefined);
 const recovered=restoreFromTrash(trashed,a.id);assert.equal(recovered[0].deletedAt,undefined);assert.equal(recovered[0].story,'My saved story');assert.equal(recovered.length,2);
});
