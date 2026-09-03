import { Types } from "mongoose";

export interface ICaseQuestion {
  _id: Types.ObjectId;
  name: string;
  image?: string;
  parent: Types.ObjectId | null;
}
