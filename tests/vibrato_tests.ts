// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// MIT License
//
// Vibrato Tests

/* eslint-disable */
// @ts-nocheck

import { VexFlowTests, TestOptions } from './vexflow_test_helpers';
import { QUnit, ok } from './support/qunit_api';
import { ContextBuilder } from 'renderer';
import { Formatter } from 'formatter';
import { TabStave } from 'tabstave';
import { Vibrato } from 'vibrato';
import { Bend } from 'bend';
import { TabNote } from 'tabnote';

const VibratoTests = {
  Start(): void {
    QUnit.module('Vibrato');
    const run = VexFlowTests.runTests;
    run('Simple Vibrato', this.simple);
    run('Harsh Vibrato', this.harsh);
    run('Vibrato with Bend', this.withBend);
  },

  simple(options: TestOptions, contextBuilder: ContextBuilder): void {
    const ctx = contextBuilder(options.elementId, 500, 140);

    ctx.scale(1.5, 1.5);
    ctx.fillStyle = '#221';
    ctx.strokeStyle = '#221';
    ctx.font = '10pt Arial';
    const stave = new TabStave(10, 10, 450).addTabGlyph().setContext(ctx).draw();

    function newNote(tab_struct) {
      return new TabNote(tab_struct);
    }
    function newVibrato() {
      return new Vibrato();
    }

    const notes = [
      newNote({
        positions: [
          { str: 2, fret: 10 },
          { str: 4, fret: 9 },
        ],
        duration: 'h',
      }).addModifier(newVibrato(), 0),
      newNote({
        positions: [{ str: 2, fret: 10 }],
        duration: 'h',
      }).addModifier(newVibrato(), 0),
    ];

    Formatter.FormatAndDraw(ctx, stave, notes);
    ok(true, 'Simple Vibrato');
  },

  harsh(options: TestOptions, contextBuilder: ContextBuilder): void {
    const ctx = contextBuilder(options.elementId, 500, 240);

    ctx.scale(1.5, 1.5);
    ctx.fillStyle = '#221';
    ctx.strokeStyle = '#221';
    ctx.font = '10pt Arial';
    const stave = new TabStave(10, 10, 450).addTabGlyph().setContext(ctx).draw();

    function newNote(tab_struct) {
      return new TabNote(tab_struct);
    }
    function newVibrato() {
      return new Vibrato();
    }

    const notes = [
      newNote({
        positions: [
          { str: 2, fret: 10 },
          { str: 4, fret: 9 },
        ],
        duration: 'h',
      }).addModifier(newVibrato().setHarsh(true), 0),
      newNote({
        positions: [{ str: 2, fret: 10 }],
        duration: 'h',
      }).addModifier(newVibrato().setHarsh(true), 0),
    ];

    Formatter.FormatAndDraw(ctx, stave, notes);
    ok(true, 'Harsh Vibrato');
  },

  withBend(options: TestOptions, contextBuilder: ContextBuilder): void {
    const ctx = contextBuilder(options.elementId, 500, 240);
    ctx.scale(1.3, 1.3);
    ctx.setFillStyle('#221');
    ctx.setStrokeStyle('#221');
    ctx.setFont('Arial', VexFlowTests.Font.size, '');
    const stave = new TabStave(10, 10, 450).addTabGlyph().setContext(ctx).draw();

    function newNote(tab_struct) {
      return new TabNote(tab_struct);
    }
    function newBend(text, release) {
      return new Bend(text, release);
    }
    function newVibrato() {
      return new Vibrato();
    }

    const notes = [
      newNote({
        positions: [
          { str: 2, fret: 9 },
          { str: 3, fret: 9 },
        ],
        duration: 'q',
      })
        .addModifier(newBend('1/2', true), 0)
        .addModifier(newBend('1/2', true), 1)
        .addModifier(newVibrato(), 0),
      newNote({
        positions: [{ str: 2, fret: 10 }],
        duration: 'q',
      })
        .addModifier(newBend('Full', false), 0)
        .addModifier(newVibrato().setVibratoWidth(60), 0),
      newNote({
        positions: [{ str: 2, fret: 10 }],
        duration: 'h',
      }).addModifier(newVibrato().setVibratoWidth(120).setHarsh(true), 0),
    ];

    Formatter.FormatAndDraw(ctx, stave, notes);
    ok(true, 'Vibrato with Bend');
  },
};

export { VibratoTests };
