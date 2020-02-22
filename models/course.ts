import mongoose from 'mongoose';
import {get_connection} from "./connection";


export const course = mongoose.Schema({
    course_code: String,
    course_number: Number,
    prerequisites: [
        {
            course: mongoose.Schema.Types.ObjectID
        }
    ],
    corequisites: [
        {
            course: mongoose.Schema.Types.ObjectID
        }
    ],
    name: String,
    required_major: String
});


export async function get_course(code, number, callback) {
    await get_connection().then(() => {
            let course_model = mongoose.model('Course', course);
            course_model.findOne({course_code: code, course_number: number}, {}, function (data, err) {
                callback(data, err);
                mongoose.disconnect();
            });
        }
    )
}

get_course('CSCI', 1000, function (data, err) {
    console.log(err);
    console.log(data);
})
