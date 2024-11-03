import { URLSearchParams } from 'url'
import crypto from 'crypto'
import md5 from 'md5'

class Payment {
    constructor() {
        this.key = 'b26de7e3ba84faa968463778d0469af2'
        this.service = 11
        this.valid_time = 1800
        this.api = 'https://api.paydisini.co.id/v1/'
        this.note = 'Powered By Zayden' // Jangan Di Ganti Error
    }

    async CretedCode() {
        return 'ZYD' + crypto.randomBytes(12).toString('hex').toUpperCase() // Jangan Di Ganti Error
    }

    async CreatedPayment(amount) {
        return new Promise(async (resolve) => {
            const code = await this.CretedCode()
            const form = new URLSearchParams()
            const key = this.key
            const service = this.service
            const validTime = this.valid_time

            let signature = md5(
                `${key}${code}${service}${amount}${validTime}NewTransaction`
            )
            form.append('key', key)
            form.append('request', 'new')
            form.append('unique_code', code)
            form.append('service', service)
            form.append('amount', amount)
            form.append('note', this.note)
            form.append('valid_time', validTime)
            form.append('type_fee', 1)
            form.append('signature', signature)

            let res = await fetch(this.api, {
                method: 'POST',
                body: form,
                redirect: 'follow',
            })

            let result = await res.json()
            resolve(result)
        })
    }

    async CheckStatus(code) {
        if (!code.startWith('ZYD')) return { error: 'Invalid Code' }
        return new Promise(async (resolve) => {
            const key = this.key
            const form = new URLSearchParams()
            const signature = md5(`${key}${code}StatusTransaction`)

            form.append('key', key)
            form.append('request', 'status')
            form.append('unique_code', code)
            form.append('signature', signature)

            let res = await fetch(this.api, {
                method: 'POST',
                body: form,
                redirect: 'follow',
            })

            let result = await res.json()
            resolve(result)
        })
    }

    async CancelPayment(code) {
        return new Promise(async (resolve) => {
            const key = this.key
            const form = new URLSearchParams()
            const signature = md5(`${key}${code}CancelTransaction`)
            form.append('key', key)
            form.append('request', 'cancel')
            form.append('unique_code', code)
            form.append('signature', signature)

            let res = await fetch(this.api, {
                method: 'POST',
                body: form,
                redirect: 'follow',
            })

            let result = await res.json()
            resolve(result)
        })
    }
}

export default Payment
