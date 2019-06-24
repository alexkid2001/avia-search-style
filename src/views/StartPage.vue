<template>
    <div class="start-page">
        <div class="start-page start-page_full-screen">
            <div class="start-page__banner start-page-banner start-page-banner_avia">
                <div class="start-page__banner-image"><img src="/img/bg/avia-bg.jpg"></div>
                <div class="content content_ind">
                    <div class="start-page-banner__logo"><span class="icon icon_avia-fly"></span>
                    </div>
                    <div class="start-page-banner__product-type">
                        <div class="product-type">
                            <div class="product-type__nav">
                                <div class="product-type__item active"><span class="icon icon_avia-fly"></span>
                                </div>
                                <div class="product-type__item"><span class="icon icon_lie-seat"></span>
                                </div>
                                <div class="product-type__item"><span class="icon icon_train"></span>
                                </div>
                                <div class="product-type__item"><span class="icon icon_car"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="start-page-banner__title">Покупка авиабилетов ещё никогда не была такой удобной</div>
                    <div class="start-page-banner__search-panel">
                        <div class="search-panel">
                            <div class="search-panel__top-block">
                                <div class="search-panel__left-block">
                                    <div class="search-panel__cities search-panel-cities">
                                        <iata-select
                                                :requestHeader="requestHeader"
                                                :label="labelDeparture"
                                                @checkAirport="checkIataDeparture">

                                        </iata-select>
                                        <div class="search-panel-cities__icon"><span class="icon icon_shape"></span>
                                        </div>
                                        <iata-select
                                                :requestHeader="requestHeader"
                                                :label="labelArrival"
                                                @checkAirport="checkIataArrival">

                                        </iata-select>
                                    </div>
                                    <div class="search-panel__dates">
                                        <div class="datepicker-input">
                                            <div class="etm-input">
                                                <div class="etm-input__title">Дата вылета</div>
                                                <datepicker v-model="date"></datepicker>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="search-panel__options">
                                        <seats-config
                                                @change-seats-params="seatsParams"
                                        >

                                        </seats-config>
                                    </div>
                                </div>
                                <div class="search-panel__right-block">
                                    <!--<router-link class="button button_action-color" @click="searchClick" to="/results"><span>Поиск</span></router-link>-->
                                    <div class="button" @click="goToResults()">Поиск</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import IATASelect from '@/components/IATAselect';
    import Datepicker from 'vuejs-datepicker';
    import SeatsConfig from '@/components/SeatsConfig'

    const date = new Date();
    const app_id = '8e71ac9f18';
    const loginURL = 'https://api-stage.etm-system.com/api/login/';
    const timeLimit = 7200;
    const searchURL = 'https://api-stage.etm-system.com/api/air/search';


    export default {
        name: 'start-page',
        components: {
            'iata-select': IATASelect,
            'datepicker': Datepicker,
            'seats-config': SeatsConfig
        },
        data() {
            return {
                loginResult: [],
                api_key: '',
                requestHeader: [],
                requestData: {
                    iataDeparture: '',
                    iataArrival: '',
                },
                selectedClass: [],
                labelDeparture: 'IATA departure',
                labelArrival: 'IATA arrival',
                date: date,
                searchQuery: {
                    directions: [
                        {
                            departure_code: "",
                            arrival_code: '',
                            date: "2019-02-21",
                            time: "M"
                        }
                    ],
                    adult_qnt: 1,
                    child_qnt: 0,
                    infant_qnt: 0,
                    travel_policy_id: 0,
                    one_order_id: 0,
                    // passenger_category: "YCD",
                    class: "E",
                    // direct: true,
                    // flexible: true,
                    max_price: "50",
                    // "airlines": [
                    //     "SU",
                    //     "HR"
                    // ],
                    // fare_types: ["PUB", "NEG"]
                }
            }
        },
        created() {
            // this.getAPIKey();
        },
        methods: {
            getAPIKey() {
                this.$http.get(loginURL  + app_id)
                    .then(response => {
                        // localStorage.api_key = response.data.etm_auth_key;
                        this.api_key = response.data.etm_auth_key;
                        this.requestHeader = {
                            headers : {
                                "Accept": "application/json, text/plain, */*",
                                "Content-Type": "application/json;charset=utf-8",
                                "X-Requested-With": "XMLHttpRequest",
                                "etm-auth-key": this.api_key }
                        };
                        this.searchRequest();
                    })
            },
            checkIataDeparture(iata) {
                this.requestData.iataDeparture = iata;
            },
            checkIataArrival(iata) {
                this.requestData.iataArrival = iata;
            },
            searchClick() {
                this.getAPIKey();
            },
            goToResults() {
                this.searchClick();

                // c6228ff991b7827a8762ff3c172a8dc2
                // 16717137
                // this.$router.push({name:'results',params:{requestID: '16717144', apiKey: '40ae0416cd23220a6328ae52d16ea96a'}})
            },
            seatsParams(adultCnt, childCnt, babyCnt, flightClass) {
                this.searchQuery.adult_qnt = adultCnt;
                this.searchQuery.child_qnt = childCnt;
                this.searchQuery.infant_qnt = babyCnt;
                this.searchQuery.class = flightClass;
            },
            searchRequest() {
                // console.log('Departure - ' + this.requestData.iataDeparture);
                // console.log('Arrival - ' + this.requestData.iataArrival);
                // console.log('Date - ' + this.searchDate);
                // console.log('urlSearch - ' + searchURL);
                // console.log('Взрослых - ' + this.searchQuery.body.adult_qnt);
                // console.log('Детей 12+  - ' + this.searchQuery.body.child_qnt);
                // console.log('Детей без места - ' + this.searchQuery.body.infant_qnt);
                // console.log('Класс полета - ' + this.searchQuery.body.class);
                this.searchQuery.directions[0].departure_code = this.requestData.iataDeparture;
                this.searchQuery.directions[0].arrival_code = this.requestData.iataArrival;
                this.searchQuery.directions[0].date = this.searchDate;
                // this.searchQuery.url = searchURL;
                // this.searchQuery.method = 'post';
                // this.searchQuery.url = searchURL;
                // this.searchQuery.method = 'post';

                // console.log('searchQuery');
                // console.log(this.searchQuery);
                this.$http.post(searchURL, this.searchQuery, this.requestHeader)
                    .then(response => {
                        this.request_id = response.body.request_id;
                        // console.log('status - ' + response.body.status);
                        // console.log('request_id - ' + response.body.request_id);
                        // console.log('RESPONS - ');
                        // console.log(response);
                        this.$router.push({name:'results',params:{requestID: this.request_id, apiKey: this.api_key}})
                    })
                    .catch(err => {
                        console.log(err);
                    })
                // console.log('Номер запроса - ' + this.request_id);
                // this.$emit('searchclick', this.requestData);
            },

        },
        computed: {
            searchDate() {
                return this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
            }
        }

    }
</script>

<style lang="scss">
    .search-panel-cities {
        align-items: flex-end;
    }

    .search-panel__dates {
        display: flex;
        align-items: flex-end;
    }

    .search-panel__options {
        display: flex;
        align-items: flex-end;
    }

    .search-panel__right-block {
        display: flex;
        align-items: flex-end;
    }

    .datepicker-input {
        width: 100%;
    }

    .vdp-datepicker {
        input {
            font-size: 12px;
            font-weight: 500;
            padding: 0 8px;
            border: 1px solid #e1e1e1;
            box-sizing: border-box;
            border-radius: 2px;
            height: 36px;
            width: 100%;
        }
    }

    .seats-option-input {
        width: 100%;
    }

    .drop-down {
        display: block;
    }

    .etm-input__iata {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
</style>