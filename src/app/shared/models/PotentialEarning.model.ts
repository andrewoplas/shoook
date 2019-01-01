export class PotentialEarning {
  id: number;
  place: string;
  type: string;
  earnings: number;
  date_created: Date;
  date_updated: Date;

  constructor(id: number, place: string, type: string, earnings: number, date_created: Date, date_updated: Date) {
    this.id = id;
    this.place = place;
    this.type = type;
    this.earnings = earnings;
    this.date_created = date_created;
    this.date_updated = date_updated;
  }
}
