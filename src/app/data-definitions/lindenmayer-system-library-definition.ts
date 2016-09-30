import { Injectable } from '@angular/core';
import { LindenmayerSystemDefinition } from './lindenmayer-system-definition';
import { LindenmayerSystemRule } from './lindenmayer-system-rule';

@Injectable()
export class LindenmayerSystemLibraryDefinition extends LindenmayerSystemDefinition {
    title: string;
    suggestedIterationCount: number;

    constructor(_title: string, _suggestedIterationCount: number, _axiom: string, _constants: string, _turningAngle: number, _rules: LindenmayerSystemRule[]) {
        super();
        this.title = _title;
        this.suggestedIterationCount = _suggestedIterationCount;
        this.axiom = _axiom;
        this.turningAngle = _turningAngle;
        this.constants = _constants;
        this.rules = _rules;
    }
}
