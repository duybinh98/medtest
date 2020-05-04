
export function convertDateTimeToDate(inputString) {

    return inputString.substring(8, 10) + '-' + inputString.substring(5, 7) + '-' + inputString.substring(0, 4);

}

export function formatMonth(currentMonth) {
    //new Date().getMonth() return the month (from 0 to 11) with January is 0, February is 1
    if (currentMonth < 9) {
        return '0' + currentMonth;
    } else {
        return currentMonth;
    };
}

export function formatDate(currentDate) {
    //new Date().getMonth() return the month (from 0 to 11) with January is 0, February is 1
    if (currentDate < 9) {
        return '0' + currentDate;
    } else {
        return currentDate;
    };
}
export function getTomorrowDate() {
    //new Date().getMonth() return the month (from 0 to 11) with January is 0, February is 1
    let tomorrowDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    var day = tomorrowDate.getDate();
    var month = tomorrowDate.getMonth() + 1;
    var year = tomorrowDate.getFullYear();
    tomorrowDate = (formatDate(day) + '-' + formatMonth(month) + '-' + year)
    console.log('this is date: ' + tomorrowDate)
    return tomorrowDate;

}

export function convertDateTimeToTime(inputString) {

    return inputString.substring(11, 13) + ':' + inputString.substring(14, 16);

}

export function convertDateAndTimeToDateTime(inputDate, inputTime) {
    return inputDate.substring(6, 10) + '-' + inputDate.substring(3, 5) + '-' + inputDate.substring(0, 2) + 'T' + inputTime + ':00.000+0000'
}

export function convertDateToDateTime(inputDate) {
    return inputDate.substring(6, 10) + '-' + inputDate.substring(3, 5) + '-' + inputDate.substring(0, 2) + 'T00:00:00.000+0000'
}

export function convertMoney(_price) {
    let price = _price.toString()
    let index = price.length - 1
    let result = ''
    while (index >= 3) {
        // console.log(price+": "+price.substring(index-2,index+1)+', '+index)
        result = '.' + price.substring(index - 2, index + 1) + result
        index -= 3
    }
    result = price.substring(0, index + 1) + result
    return result
}

export function getApiUrl() {
    // return "https://medtest-backend.herokuapp.com";
    return "http://192.168.1.6:8080"
}
export function getStateName(status) {
    switch (status) {
        case 'pending':
            return 'Đang đợi y tá nhận đơn';
            break;
        case 'coordinatorlostsample':
            return 'Điều phối viên làm mất mẫu';
            break;
        case 'accepted':
            return 'Đang đợi lấy mẫu';
            break;
        case 'transporting':
            return 'Đang vận chuyển mẫu';
            break;
        case 'lostsample':
            return 'Đang đợi lấy lại mẫu';
            break;
        case 'waitingforresult':
            return 'Đang đợi kết quả';
            break;
        case 'closed':
            return 'Đã xong';
            break;
        case 'reaccepted':
            return 'Đã nhận đơn bị mất do điều phối viên';
            break;
        case 'retransporting':
            return 'Đang vận chuyển đơn bị mất do điều phối viên';
            break;
        case 'relostsample':
            return 'Đang đợi lấy lại mẫu do điều phối viên làm mất';
            break;
        case 'canceled':
            return 'Đã hủy';
            break;
    }
}
export function getStateColor(status) {
    switch (status) {
        case 'pending':
            return '#ffd66f';
            break;
        case 'coordinatorlostsample':
            return '#ffd66f';
            break;
        case 'accepted':
            return '#a4d57b';
            break;
        case 'transporting':
            return '#a4d57b';
            break;
        case 'lostsample':
            return '#a4d57b';
            break;
        case 'waitingforresult':
            return '#6398d6';
            break;
        case 'closed':
            return '#a4d57b';
            break;
        case 'canceled':
            return '#6398d6';
            break;
        case 'reaccepted':
        case 'retransporting':
        case 'relostsample':
            return '#a4d57b';
            break;
    }
}