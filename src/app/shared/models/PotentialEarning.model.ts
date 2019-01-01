interface IPotentialEarning {    
  id: number;
  place: string;
  type: string;
  earnings: number;
  date_created: Date;
  date_updated: Date;
}

export class PotentialEarning {
  public id: number;
  public place: string;
  public type: string;
  public earnings: number;
  public date_created: Date;
  public date_updated: Date;

  constructor();
  constructor(obj: IPotentialEarning); 
  constructor(obj?: any) {
    this.id = obj && obj.id;
    this.place = obj && obj.place;
    this.type = obj && obj.type;
    this.earnings = obj && obj.earnings;
    this.date_created = obj && obj.date_created;
    this.date_updated = obj && obj.date_updated;
  }
}
