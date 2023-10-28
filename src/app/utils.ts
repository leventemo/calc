export class Utils {

  public static getElapsedMonths(startingDate: Date, dateNow: Date): number {
    const diffInMs = dateNow.getTime() - startingDate.getTime();
    return Math.round(diffInMs / (30 * 24 * 60 * 60 * 1000));
  };

}
