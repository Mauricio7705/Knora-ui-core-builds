import { KnoraConstants, KnoraSchema } from './knora-constants';
import { GravsearchGenerationService } from '../../services';
export class Equals {
    constructor() {
        this.type = KnoraConstants.EqualsComparisonOperator;
        this.label = KnoraConstants.EqualsComparisonLabel;
    }
    getClassName() {
        return 'Equals';
    }
}
export class NotEquals {
    constructor() {
        this.type = KnoraConstants.NotEqualsComparisonOperator;
        this.label = KnoraConstants.NotEqualsComparisonLabel;
    }
    getClassName() {
        return 'NotEquals';
    }
}
export class GreaterThanEquals {
    constructor() {
        this.type = KnoraConstants.GreaterThanEqualsComparisonOperator;
        this.label = KnoraConstants.GreaterThanEqualsComparisonLabel;
    }
    getClassName() {
        return 'GreaterThanEquals';
    }
}
export class GreaterThan {
    constructor() {
        this.type = KnoraConstants.GreaterThanComparisonOperator;
        this.label = KnoraConstants.GreaterThanComparisonLabel;
    }
    getClassName() {
        return 'GreaterThan';
    }
}
export class LessThan {
    constructor() {
        this.type = KnoraConstants.LessThanComparisonOperator;
        this.label = KnoraConstants.LessThanComparisonLabel;
    }
    getClassName() {
        return 'LessThan';
    }
}
export class LessThanEquals {
    constructor() {
        this.type = KnoraConstants.LessThanEqualsComparisonOperator;
        this.label = KnoraConstants.LessThanQualsComparisonLabel;
    }
    getClassName() {
        return 'LessThanEquals';
    }
}
export class Exists {
    constructor() {
        this.type = KnoraConstants.ExistsComparisonOperator;
        this.label = KnoraConstants.ExistsComparisonLabel;
    }
    getClassName() {
        return 'Exists';
    }
}
export class Like {
    constructor() {
        this.type = KnoraConstants.LikeComparisonOperator;
        this.label = KnoraConstants.LikeComparisonLabel;
    }
    getClassName() {
        return 'Like';
    }
}
export class Match {
    constructor() {
        this.type = KnoraConstants.MatchComparisonOperator;
        this.label = KnoraConstants.MatchComparisonLabel;
    }
    getClassName() {
        return 'Match';
    }
}
/**
 * Combination of a comparison operator and a value literal or an IRI.
 * In case the comparison operator is 'Exists', no value is given.
 */
export class ComparisonOperatorAndValue {
    constructor(comparisonOperator, value) {
        this.comparisonOperator = comparisonOperator;
        this.value = value;
    }
}
/**
 * Represents a property's value as a literal with the indication of its type.
 */
export class ValueLiteral {
    /**
     * Constructs a [ValueLiteral].
     *
     * @param {string} value the literal representation of the value.
     * @param {string} type the type of the value (making use of xsd).
     */
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
    /**
     * Creates a type annotated value literal to be used in a SPARQL query.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    toSparql(schema) {
        let literalType;
        // check if a Knora schema conversion is necessary, e.g., knora-api:dateValue (complex) to knora-api:date (simple).
        // xsd types will remain unchanged
        if (schema === KnoraSchema.simple && GravsearchGenerationService.typeConversionComplexToSimple[this.type] !== undefined) {
            // convert to simple schema
            literalType = GravsearchGenerationService.typeConversionComplexToSimple[this.type];
        }
        else {
            // do not convert
            literalType = this.type;
        }
        return `"${this.value}"^^<${literalType}>`;
    }
}
/**
 * Represents an IRI.
 */
export class IRI {
    /**
     * Constructs an [IRI].
     *
     * @param {string} iri the IRI of a resource instance.
     */
    constructor(iri) {
        this.iri = iri;
    }
    /**
     * Creates a SPARQL representation of the IRI.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    toSparql(schema) {
        // this is an instance Iri and does not have to be converted.
        return `<${this.iri}>`;
    }
}
/**
 * Represents a property, the specified comparison operator, and value.
 */
export class PropertyWithValue {
    /**
     * Constructs a [PropertyWithValue].
     *
     * @param {Property} property the specified property.
     * @param {ComparisonOperatorAndValue} valueLiteral the specified comparison operator and value.
     * @param isSortCriterion indicates if the property is used as a sort criterion.
     */
    constructor(property, valueLiteral, isSortCriterion) {
        this.property = property;
        this.valueLiteral = valueLiteral;
        this.isSortCriterion = isSortCriterion;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMkJBQTJCLEVBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQW1CdkUsTUFBTTtJQUtGO1FBSEEsU0FBSSxHQUFHLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQztRQUMvQyxVQUFLLEdBQUcsY0FBYyxDQUFDLHFCQUFxQixDQUFDO0lBRzdDLENBQUM7SUFFRCxZQUFZO1FBQ1IsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUFHRCxNQUFNO0lBS0Y7UUFIQSxTQUFJLEdBQUcsY0FBYyxDQUFDLDJCQUEyQixDQUFDO1FBQ2xELFVBQUssR0FBRyxjQUFjLENBQUMsd0JBQXdCLENBQUM7SUFHaEQsQ0FBQztJQUVELFlBQVk7UUFDUixNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQUVELE1BQU07SUFLRjtRQUhBLFNBQUksR0FBRyxjQUFjLENBQUMsbUNBQW1DLENBQUM7UUFDMUQsVUFBSyxHQUFHLGNBQWMsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUd4RCxDQUFDO0lBRUQsWUFBWTtRQUNSLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUFFRCxNQUFNO0lBS0Y7UUFIQSxTQUFJLEdBQUcsY0FBYyxDQUFDLDZCQUE2QixDQUFDO1FBQ3BELFVBQUssR0FBRyxjQUFjLENBQUMsMEJBQTBCLENBQUM7SUFHbEQsQ0FBQztJQUVELFlBQVk7UUFDUixNQUFNLENBQUMsYUFBYSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjtBQUVELE1BQU07SUFLRjtRQUhBLFNBQUksR0FBRyxjQUFjLENBQUMsMEJBQTBCLENBQUM7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cmFDb25zdGFudHMsIEtub3JhU2NoZW1hIH0gZnJvbSAnLi9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLCBQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzJztcblxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYSBjb21wYXJpc29uIG9wZXJhdG9yLlxuICogVGhpcyBpbnRlcmZhY2UgaXMgaW1wbGVtZW50ZWQgZm9yIHRoZSBzdXBwb3J0ZWQgY29tcGFyaXNvbiBvcGVyYXRvcnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIC8vIHR5cGUgb2YgY29tcGFyaXNvbiBvcGVyYXRvclxuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8vIHRoZSBsYWJlbCBvZiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciB0byBiZSBwcmVzZW50ZWQgdG8gdGhlIHVzZXIuXG4gICAgbGFiZWw6IHN0cmluZztcblxuICAgIC8vIHJldHVybnMgdGhlIGNsYXNzIG5hbWUgd2hlbiBjYWxsZWQgb24gYW4gaW5zdGFuY2VcbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5FcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnRXF1YWxzJztcbiAgICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIE5vdEVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTm90RXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTm90RXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ05vdEVxdWFscyc7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR3JlYXRlclRoYW5FcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnR3JlYXRlclRoYW5FcXVhbHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyZWF0ZXJUaGFuIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkNvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0dyZWF0ZXJUaGFuJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXNzVGhhbiBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5Db21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMZXNzVGhhbic7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGVzc1RoYW5FcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5RdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMZXNzVGhhbkVxdWFscyc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBFeGlzdHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkV4aXN0c0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkV4aXN0c0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdFeGlzdHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExpa2UgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpa2VDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5MaWtlQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0xpa2UnO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTWF0Y2ggaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLk1hdGNoQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTWF0Y2hDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTWF0Y2gnO1xuICAgIH1cblxufVxuXG4vKipcbiAqIENvbWJpbmF0aW9uIG9mIGEgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgYSB2YWx1ZSBsaXRlcmFsIG9yIGFuIElSSS5cbiAqIEluIGNhc2UgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgaXMgJ0V4aXN0cycsIG5vIHZhbHVlIGlzIGdpdmVuLlxuICovXG5leHBvcnQgY2xhc3MgQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgY29tcGFyaXNvbk9wZXJhdG9yOiBDb21wYXJpc29uT3BlcmF0b3IsIHJlYWRvbmx5IHZhbHVlPzogVmFsdWUpIHtcbiAgICB9XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhIHZhbHVlOiBhbiBJUkkgb3IgYSBsaXRlcmFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIFR1cm5zIHRoZSB2YWx1ZSBpbnRvIGEgU1BBUlFMIHN0cmluZyByZXByZXNlbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBTUEFSUUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgICAqL1xuICAgIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmc7XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcHJvcGVydHkncyB2YWx1ZSBhcyBhIGxpdGVyYWwgd2l0aCB0aGUgaW5kaWNhdGlvbiBvZiBpdHMgdHlwZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZhbHVlTGl0ZXJhbCBpbXBsZW1lbnRzIFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbVmFsdWVMaXRlcmFsXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSB0aGUgbGl0ZXJhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIHR5cGUgb2YgdGhlIHZhbHVlIChtYWtpbmcgdXNlIG9mIHhzZCkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB2YWx1ZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nKSB7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgdHlwZSBhbm5vdGF0ZWQgdmFsdWUgbGl0ZXJhbCB0byBiZSB1c2VkIGluIGEgU1BBUlFMIHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmcge1xuXG4gICAgICAgIGxldCBsaXRlcmFsVHlwZTogc3RyaW5nO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGEgS25vcmEgc2NoZW1hIGNvbnZlcnNpb24gaXMgbmVjZXNzYXJ5LCBlLmcuLCBrbm9yYS1hcGk6ZGF0ZVZhbHVlIChjb21wbGV4KSB0byBrbm9yYS1hcGk6ZGF0ZSAoc2ltcGxlKS5cbiAgICAgICAgLy8geHNkIHR5cGVzIHdpbGwgcmVtYWluIHVuY2hhbmdlZFxuICAgICAgICBpZiAoc2NoZW1hID09PSBLbm9yYVNjaGVtYS5zaW1wbGUgJiYgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW3RoaXMudHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29udmVydCB0byBzaW1wbGUgc2NoZW1hXG4gICAgICAgICAgICBsaXRlcmFsVHlwZSA9IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVt0aGlzLnR5cGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZG8gbm90IGNvbnZlcnRcbiAgICAgICAgICAgIGxpdGVyYWxUeXBlID0gdGhpcy50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGBcIiR7dGhpcy52YWx1ZX1cIl5ePCR7bGl0ZXJhbFR5cGV9PmA7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBJUkkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJUkkgaW1wbGVtZW50cyBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGFuIFtJUkldLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSB0aGUgSVJJIG9mIGEgcmVzb3VyY2UgaW5zdGFuY2UuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaXJpOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgU1BBUlFMIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBJUkkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9TcGFycWwoc2NoZW1hOiBLbm9yYVNjaGVtYSk6IHN0cmluZyB7XG4gICAgICAgIC8vIHRoaXMgaXMgYW4gaW5zdGFuY2UgSXJpIGFuZCBkb2VzIG5vdCBoYXZlIHRvIGJlIGNvbnZlcnRlZC5cbiAgICAgICAgcmV0dXJuIGA8JHt0aGlzLmlyaX0+YDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgdGhhdCByZXByZXNlbnRzIGEgdmFsdWUuXG4gKiBUaGlzIGludGVyZmFjZSBoYXMgdG8gYmUgaW1wbGVtZW50ZWQgZm9yIGFsbCB2YWx1ZSB0eXBlcyAodmFsdWUgY29tcG9uZW50IGNsYXNzZXMpLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb3BlcnR5VmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogVHlwZSBvZiB0aGUgdmFsdWUuXG4gICAgICovXG4gICAgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7VmFsdWV9LlxuICAgICAqL1xuICAgIGdldFZhbHVlKCk6IFZhbHVlO1xuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHByb3BlcnR5LCB0aGUgc3BlY2lmaWVkIGNvbXBhcmlzb24gb3BlcmF0b3IsIGFuZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5V2l0aFZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbUHJvcGVydHlXaXRoVmFsdWVdLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eX0gcHJvcGVydHkgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge0NvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlfSB2YWx1ZUxpdGVyYWwgdGhlIHNwZWNpZmllZCBjb21wYXJpc29uIG9wZXJhdG9yIGFuZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gaXNTb3J0Q3JpdGVyaW9uIGluZGljYXRlcyBpZiB0aGUgcHJvcGVydHkgaXMgdXNlZCBhcyBhIHNvcnQgY3JpdGVyaW9uLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBwcm9wZXJ0eTogUHJvcGVydHksXG4gICAgICAgIHJlYWRvbmx5IHZhbHVlTGl0ZXJhbDogQ29tcGFyaXNvbk9wZXJhdG9yQW5kVmFsdWUsXG4gICAgICAgIHJlYWRvbmx5IGlzU29ydENyaXRlcmlvbjogQm9vbGVhbikge1xuICAgIH1cblxufVxuXG4vKipcbiAqIGEgbGlzdCwgd2hpY2ggaXMgdXNlZCBpbiB0aGUgbWF0LWF1dG9jb21wbGV0ZSBmb3JtIGZpZWxkXG4gKiBjb250YWlucyBvYmplY3RzIHdpdGggaWQgYW5kIG5hbWUuIHRoZSBpZCBpcyB1c3VhbCB0aGUgaXJpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b2NvbXBsZXRlSXRlbSB7XG4gICAgaXJpOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxhYmVsPzogc3RyaW5nO1xufVxuXG4iXX0=