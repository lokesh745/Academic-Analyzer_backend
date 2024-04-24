export interface result_data_object {
  isa: number;
  mse: number;
  ese: number;
}

const data: Array<result_data_object> = [
  {
    isa: 20,
    mse: 30,
    ese: 50,
  },
  {
    isa: 25,
    mse: 0,
    ese: 25,
  },
  {
    isa: 50,
    mse: 0,
    ese: 100,
  },
];

export const resultDetails = (course_id: string): result_data_object => {
  if (course_id.includes("C")) {
    return data[0];
  } else if (course_id.includes("DO")) {
    return data[0];
  } else if (course_id.includes("L")) {
    return data[1];
  } else if (course_id.includes("M")) {
    return data[1];
  } else {
    return data[2];
  }
};
