const STUDENT =
  "f8cb31e8a4dd16d33a3c43c47b83a349ccb30eed1706e07138f72a0325cb0cb10a4b4103cba772d8457dc9ef1d65277b0ec21df7fc0adcc931e0ef9fe996010a338a765d4f5e06d5c4af50f0fdec103cdff9ac9cc7f7b1eba104004653ff1208255462df2a37f4339c074d5097108bfa82ca89ac2f273c068e8aec201a4d45e5388b516a253c23102fcb67fd426adbec882029f7b7f1328367f3490f7c2314";

const PROFESSOR =
  "e4e145c550422d525c4406d7ed5b7e07b5b21e428b1a925121b2f465f727f6372160ea44b0a29d670ce71a762e1bf93b21689d44aee815297a7434a7875f129c7159649314da8ad5d50506fd0a885aa2d958491b656f6ef868dd5ea4509220f783c72dc429bfa089c59dd505486b6154526e0ec581b9b942c6765a911d76e5077e9d92d70bf06d9976c3987da82794e97ed8ea39f956a7ac752cd761d9f728a3";

const ADMIN =
  "b69a219ce6f79ccdfb0f7ec5e9af79b39abca8f5f65ad2589ac8ec25b9689f05db94eabc641b10243d345ad18bce45346922cb0cc544306c6584a74ce705f1b0bdca9506f42f9cdd585182137d61c1a9575c05f3acfc4cc27bcaa84f08e4896ebe3022e19b18750ab5652ad5eaff8c1172daa448ec53f5376874ec3f35d89f70624c932b15cf7ab4a9ee26f6187a3e21e9e4f7abf696663051ce96fe7657b8f4";

export const getRole = (role: string): string => {
  if (role === ADMIN) {
    return "ADMIN";
  } else if (role === PROFESSOR) {
    return "PROFESSOR";
  } else {
    return "STUDENT";
  }
};

export const decodeRole = (role: string): string => {
  if (role === "ADMIN") {
    return ADMIN;
  } else if (role === "PROFESSOR") {
    return PROFESSOR;
  } else if (role === "STUDENT") {
    return STUDENT;
  } else {
    return "";
  }
};

interface Obj {
  rollNo: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNo: number;
  role: string;
  department_name: string;
}

export const customUserList = (arr: Obj[]): Obj[] => {
  let list: Obj[];
  list = arr?.map((i: Obj) => {
    return { ...i, role: getRole(i.role) };
  });
  return list;
};
