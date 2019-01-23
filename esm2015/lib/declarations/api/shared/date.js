/**
 * Precision for DateSalsah.
 */
export var Precision;
(function (Precision) {
    Precision[Precision["yearPrecision"] = 0] = "yearPrecision";
    Precision[Precision["monthPrecision"] = 1] = "monthPrecision";
    Precision[Precision["dayPrecision"] = 2] = "dayPrecision";
})(Precision || (Precision = {}));
/**
 * Represents a Salsah date object with a precision information.
 */
export class DateSalsah {
    constructor(calendar, era, year, month, day) {
        this.calendar = calendar;
        this.era = era;
        this.year = year;
        this.month = month;
        this.day = day;
        if (this.month === undefined) {
            // year precision
            this.precision = Precision.yearPrecision;
        }
        else if (this.day === undefined) {
            // month precision
            this.precision = Precision.monthPrecision;
        }
        else {
            // day precision
            this.precision = Precision.dayPrecision;
        }
    }
    /**
     * Returns a string representation of the date without the calendar.
     *
     * @returns {string}
     */
    getDateAsStringWithoutCalendar() {
        let dateString = '(' + this.era + ') ';
        switch (this.precision) {
            case Precision.yearPrecision: {
                dateString += this.year.toString();
                break;
            }
            case Precision.monthPrecision: {
                dateString += this.year + DateSalsah.separator + this.month;
                break;
            }
            case Precision.dayPrecision: {
                dateString += this.year + DateSalsah.separator + this.month + DateSalsah.separator + this.day;
                break;
            }
            default: {
                break;
            }
        }
        return dateString;
    }
    /**
     * Returns a string representation of the date (with calendar).
     *
     * @returns {string}
     */
    getDateAsString() {
        return this.calendar + ':' + this.getDateAsStringWithoutCalendar();
    }
}
DateSalsah.separator = '-';
/**
 * Represents a period (with start date and end date).
 */
export class DateRangeSalsah {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Returns a string representation of the date range (with preceding calendar).
     *
     * @returns {string}
     */
    getDateAsString() {
        return this.start.getDateAsString() + ':' + this.end.getDateAsStringWithoutCalendar();
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL2RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ2pCLDJEQUFhLENBQUE7SUFDYiw2REFBYyxDQUFBO0lBQ2QseURBQVksQ0FBQTtBQUNoQixDQUFDLEVBSlcsU0FBUyxLQUFULFNBQVMsUUFJcEI7QUFFRDs7R0FFRztBQUNILE1BQU07SUFNRixZQUNhLFFBQWdCLEVBQ2hCLEdBQVcsRUFDWCxJQUFZLEVBQ1osS0FBYyxFQUNkLEdBQVk7UUFKWixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osVUFBSyxHQUFMLEtBQUssQ0FBUztRQUNkLFFBQUcsR0FBSCxHQUFHLENBQVM7UUFFckIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUMxQixpQkFBaUI7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO1NBQzVDO2FBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUMvQixrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDO1NBQzdDO2FBQU07WUFDSCxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO1NBQzNDO0lBRUwsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw4QkFBOEI7UUFFMUIsSUFBSSxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBRXZDLFFBQVEsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUVwQixLQUFLLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDMUIsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ25DLE1BQU07YUFDVDtZQUVELEtBQUssU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMzQixVQUFVLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzVELE1BQU07YUFDVDtZQUVELEtBQUssU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6QixVQUFVLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUM5RixNQUFNO2FBQ1Q7WUFFRCxPQUFPLENBQUMsQ0FBQztnQkFDTCxNQUFNO2FBQ1Q7U0FFSjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZUFBZTtRQUVYLE9BQU8sSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7SUFDdkUsQ0FBQzs7QUFuRWMsb0JBQVMsR0FBRyxHQUFHLENBQUM7QUF1RW5DOztHQUVHO0FBQ0gsTUFBTTtJQUVGLFlBQ2EsS0FBaUIsRUFDakIsR0FBZTtRQURmLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsUUFBRyxHQUFILEdBQUcsQ0FBWTtJQUU1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGVBQWU7UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsQ0FBQztJQUMxRixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFByZWNpc2lvbiBmb3IgRGF0ZVNhbHNhaC5cbiAqL1xuZXhwb3J0IGVudW0gUHJlY2lzaW9uIHtcbiAgICB5ZWFyUHJlY2lzaW9uLFxuICAgIG1vbnRoUHJlY2lzaW9uLFxuICAgIGRheVByZWNpc2lvblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBTYWxzYWggZGF0ZSBvYmplY3Qgd2l0aCBhIHByZWNpc2lvbiBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVTYWxzYWgge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2VwYXJhdG9yID0gJy0nO1xuXG4gICAgcmVhZG9ubHkgcHJlY2lzaW9uOiBQcmVjaXNpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgY2FsZW5kYXI6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgZXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHllYXI6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgbW9udGg/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGRheT86IG51bWJlclxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyB5ZWFyIHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24ueWVhclByZWNpc2lvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRheSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBtb250aCBwcmVjaXNpb25cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uID0gUHJlY2lzaW9uLm1vbnRoUHJlY2lzaW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZGF5IHByZWNpc2lvblxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHdpdGhvdXQgdGhlIGNhbGVuZGFyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKSB7XG5cbiAgICAgICAgbGV0IGRhdGVTdHJpbmcgPSAnKCcgKyB0aGlzLmVyYSArICcpICc7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnByZWNpc2lvbikge1xuXG4gICAgICAgICAgICBjYXNlIFByZWNpc2lvbi55ZWFyUHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24ubW9udGhQcmVjaXNpb246IHtcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IHRoaXMueWVhciArIERhdGVTYWxzYWguc2VwYXJhdG9yICsgdGhpcy5tb250aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24uZGF5UHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIgKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMubW9udGggKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMuZGF5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlU3RyaW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRhdGUgKHdpdGggY2FsZW5kYXIpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhciArICc6JyArIHRoaXMuZ2V0RGF0ZUFzU3RyaW5nV2l0aG91dENhbGVuZGFyKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBlcmlvZCAod2l0aCBzdGFydCBkYXRlIGFuZCBlbmQgZGF0ZSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlUmFuZ2VTYWxzYWgge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0OiBEYXRlU2Fsc2FoLFxuICAgICAgICByZWFkb25seSBlbmQ6IERhdGVTYWxzYWhcbiAgICApIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlIHJhbmdlICh3aXRoIHByZWNlZGluZyBjYWxlbmRhcikuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldERhdGVBc1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQuZ2V0RGF0ZUFzU3RyaW5nKCkgKyAnOicgKyB0aGlzLmVuZC5nZXREYXRlQXNTdHJpbmdXaXRob3V0Q2FsZW5kYXIoKTtcbiAgICB9XG59XG4iXX0=