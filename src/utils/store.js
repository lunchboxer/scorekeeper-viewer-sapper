import { Store } from 'svelte/store.js'
import { APPNAME } from './constants.js'

const store = new Store({
  APPNAME,
  user: null,
  login: null,
  students: [],
  attendances: []
})

store.compute(
  'absentStudents',
  ['students', 'attendances'],
  (students, attendances) => {
    return students.filter(student => {
      const myattendance = attendances.find(
        attendance => attendance.student === student.id
      )
      return myattendance
        ? ['absent', 'lateLeftEarly', 'leftEarly'].includes(myattendance.status)
        : true
    })
  }
)
store.compute(
  'presentStudents',
  ['students', 'attendances'],
  (students, attendances) =>
    students.filter(student => {
      const myattendance = attendances.find(
        attendance => attendance.student === student.id
      )
      return myattendance && ['present', 'late'].includes(myattendance.status)
    })
)

export default store
