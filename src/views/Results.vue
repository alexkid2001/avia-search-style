<template>
    <div class="content content_ind">
        <div class="animation-2" v-if="isLoading">
            <div class="animation-2__wrap">
                <div class="animation-2__layout-cloud"></div>
                <div class="animation-2__layout-back"></div>
                <div class="animation-2__layout-plane"></div>
                <div class="animation-2__layout-banner"></div>
                <div class="animation-2__layout-front"></div>
            </div>
        </div>

        <div class="results-area results-area_avia" v-if="isOK">
            <div class="results-area__filters custom-scrollbar custom-scrollbar_transparent">
                <div class="etm-filters etm-filters_border etm-filters_avia">
                    <div class="etm-filters__list">
                        <div class="etm-filters__item etm-filters-item active">
                            <div class="etm-filters-item__title"><span>Цена</span></div>
                            <div class="etm-filters-item__filter">
                                <div class="input-range">
                                    <vue-slider
                                        ref="slider"
                                        v-bind="price"
                                        v-model="price.value"
                                        @input="maxPrice">
                                    </vue-slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="results-area__offers">
                <div class="avia-offers">
                    <div class="rollup-button"></div>
                    <div class="avia-offers__sorting-block">
                        <div class="service-line service-line_avia">
                            <div class="sorting-block">
                                <div class="sorting-block__title">{{offersCnt}} вариантов</div>
                                <div class="sorting-block__sorting-rule">По популярности</div>
                            </div>
                        </div>
                    </div>
                    <div class="avia-offers__offers">
                        <div class="avia-offers">
                            <div class="offers-block__list" v-bind:key="index" v-for="(offer, index) in filteredPrice()">
                                <offers
                                        :offer="offer"
                                        :price="price.value">
                                </offers>
                            </div>
                            <!--<div class="avia-offers__item">-->
                            <!--&lt;!&ndash; each flight, flightIndex in obj.flights&ndash;&gt;-->
                            <!--<div class="avia-offer">-->
                            <!--<div class="avia-offer__info-block">-->
                            <!--<div class="avia-offer__header avia-offer-header">-->
                            <!--<div class="avia-offer-header__airlines">-->
                            <!--<div class="avia-offer-header__airlines-logo">-->
                            <!--<div class="avia-offer-header__airline-logo"><img src="/img/card/aura-card.svg"/></div>-->
                            <!--<div class="avia-offer-header__airline-logo"><img src="/img/card/aura-card.svg"/></div>-->
                            <!--<div class="avia-offer-header__airline-logo"><img src="/img/card/aura-card.svg"/></div>-->
                            <!--<div class="avia-offer-header__airline-logo"><img src="/img/card/aura-card.svg"/></div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-header__airlines-name hide-in-mobile">-->
                            <!--<div class="avia-offer-header__airline-name">Goat</div>-->
                            <!--<div class="avia-offer-header__airline-name">, s7Airlins</div>-->
                            <!--<div class="avia-offer-header__airline-name">, s7Airlins</div>-->
                            <!--<div class="avia-offer-header__airline-name">, Saratov Stock Co</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-header__luggage-rules-icons hide-in-mobile"><span class="font-icon font-icon_bag font-icon_forbidden"></span><span class="font-icon font-icon_luggage font-icon_forbidden"></span>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-header__price show-in-mobile">12300 ₽</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer__route">-->
                            <!--<div class="route route_avia">-->
                            <!--<div class="route__origin">-->
                            <!--<div class="route__time">15:30</div>-->
                            <!--<div class="route__port-name hide-in-mobile">Санкт-Петербург</div>-->
                            <!--<div class="route__port-name show-in-mobile">LED</div>-->
                            <!--</div>-->
                            <!--<div class="route__path">-->
                            <!--<div class="route__total-time">В пути: 1ч 15м</div>-->
                            <!--<div class="route__stops">-->
                            <!--<div class="route__stop-origin">-->
                            <!--<div class="etm-tooltip route__stop-name">LED-->
                            <!--<div class="etm-tooltip__text">Санкт-Петербург</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="route__connector"></div>-->
                            <!--<div class="route__stop">-->
                            <!--<div class="etm-tooltip route__stop-name">DME-->
                            <!--<div class="etm-tooltip__text">Москва</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;.route__stop-name= points[i++].origin_port_short&ndash;&gt;-->
                            <!--</div>-->
                            <!--<div class="route__connector"></div>-->
                            <!--<div class="route__stop">-->
                            <!--<div class="etm-tooltip route__stop-name">LED-->
                            <!--<div class="etm-tooltip__text">Санкт-Петербург</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;.route__stop-name= points[i++].origin_port_short&ndash;&gt;-->
                            <!--</div>-->
                            <!--<div class="route__connector"></div>-->
                            <!--<div class="route__stop">-->
                            <!--<div class="etm-tooltip route__stop-name">DME-->
                            <!--<div class="etm-tooltip__text">Москвв</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash;.route__stop-name= points[i++].origin_port_short&ndash;&gt;-->
                            <!--</div>-->
                            <!--<div class="route__connector"></div>-->
                            <!--<div class="route__stop-destination">-->
                            <!--<div class="etm-tooltip route__stop-name">VIE-->
                            <!--<div class="etm-tooltip__text"></div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="route__point-name"></div>-->
                            <!--</div>-->
                            <!--<div class="route__destination">-->
                            <!--<div class="route__time">18:30-->
                            <!--</div>-->
                            <!--<div class="route__port-name hide-in-mobile"></div>-->
                            <!--<div class="route__port-name show-in-mobile">VIE</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer__details-block">-->
                            <!--<div class="avia-offer__details avia-offer-details">-->
                            <!--<div class="avia-offer-details__info">-->
                            <!--<div class="avia-offer-details__segment">-->
                            <!--<div class="flight-info flight-info_avia">-->
                            <!--<div class="flight-info__detail">-->
                            <!--<div class="flight-info__center-section">-->
                            <!--<div class="flight-info__origin">-->
                            <!--<div class="flight-info__time">15:30</div>-->
                            <!--<div class="flight-info__city">LED Пулково, Санкт-Петербург</div>-->
                            <!--<div class="flight-info__date">9 ноя, Чт</div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__destination">-->
                            <!--<div class="flight-info__time">18:30</div>-->
                            <!--<div class="flight-info__city">DME Домодедово, Москва</div>-->
                            <!--<div class="flight-info__date">9 ноя, Чт</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__airline-logo"><img src="/img/card/aura-card.svg" alt="alt"/></div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__addition-params">-->
                            <!--<div class="flight-info__param">Рейс:<span> US21284</span></div>-->
                            <!--<div class="flight-info__param">Продолжительность перелёта:<span> 2 часа 30 минут</span></div>-->
                            <!--<div class="flight-info__param">Самолёт:<span> Airgus 20</span></div>-->
                            <!--<div class="flight-info__param">Услуги на борту:<span> </span></div>-->
                            <!--<div class="flight-info__param">Багаж:<span>  Нормы провоза багажа могут отличаться в зависимости от тарифа</span></div>-->
                            <!--<div class="flight-info__param">Авиакомпания:<span> Уральские Авиалинии</span></div>-->
                            <!--<div class="link link_more-rules-avia">Показать полные правила</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-details__connect-info">-->
                            <!--<div class="connect-info connect-info_long-stop connect-info_change-port connect-info_compact"><span class="connect-info__descr"><span class="connect-info__descr-long-stop">Длительная пересадка – 1д 19ч 15мин</span></span><span class="connect-info__change-port">Смена аэропорта<span class="connect-info__port_1">SVO</span><span class="connect-info__port_2">VKO</span></span>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-details__segment">-->
                            <!--<div class="flight-info flight-info_avia">-->
                            <!--<div class="flight-info__detail">-->
                            <!--<div class="flight-info__center-section">-->
                            <!--<div class="flight-info__origin">-->
                            <!--<div class="flight-info__time">15:30</div>-->
                            <!--<div class="flight-info__city">DME Домодедово, Москва</div>-->
                            <!--<div class="flight-info__date">9 ноя, Чт</div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__destination">-->
                            <!--<div class="flight-info__time">18:30</div>-->
                            <!--<div class="flight-info__city">VIE Пулково, Вена</div>-->
                            <!--<div class="flight-info__date">13 ноя, Чт</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__airline-logo"><img src="/img/card/aura-card.svg" alt="alt"/></div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__addition-params">-->
                            <!--<div class="flight-info__param">Рейс:<span> US21284</span></div>-->
                            <!--<div class="flight-info__param">Продолжительность перелёта:<span> 2 часа 30 минут</span></div>-->
                            <!--<div class="flight-info__param">Самолёт:<span> Airgus 20</span></div>-->
                            <!--<div class="flight-info__param">Услуги на борту:<span> </span></div>-->
                            <!--<div class="flight-info__param">Багаж:<span>  Нормы провоза багажа могут отличаться в зависимости от тарифа</span></div>-->
                            <!--<div class="flight-info__param">Авиакомпания:<span> Уральские Авиалинии</span></div>-->
                            <!--<div class="link link_more-rules-avia">Показать полные правила</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-details__connect-info">-->
                            <!--<div class="connect-info connect-info_long-stop connect-info_change-terminal connect-info_compact"><span class="connect-info__descr"><span class="connect-info__descr-long-stop">Длительная пересадка – 1д 19ч 15мин</span></span><span class="connect-info__change-terminal">Смена терминала - B</span>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-details__segment">-->
                            <!--<div class="flight-info flight-info_avia">-->
                            <!--<div class="flight-info__detail">-->
                            <!--<div class="flight-info__center-section">-->
                            <!--<div class="flight-info__origin">-->
                            <!--<div class="flight-info__time">15:30</div>-->
                            <!--<div class="flight-info__city">LED Пулково, Санкт-Петербург</div>-->
                            <!--<div class="flight-info__date">9 ноя, Чт</div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__destination">-->
                            <!--<div class="flight-info__time">18:30</div>-->
                            <!--<div class="flight-info__city">DME Домодедово, Москва</div>-->
                            <!--<div class="flight-info__date">9 ноя, Чт</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__airline-logo"><img src="/img/card/aura-card.svg" alt="alt"/></div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__addition-params">-->
                            <!--<div class="flight-info__param">Рейс:<span> US21284</span></div>-->
                            <!--<div class="flight-info__param">Продолжительность перелёта:<span> 2 часа 30 минут</span></div>-->
                            <!--<div class="flight-info__param">Самолёт:<span> Airgus 20</span></div>-->
                            <!--<div class="flight-info__param">Услуги на борту:<span> </span></div>-->
                            <!--<div class="flight-info__param">Багаж:<span>  Нормы провоза багажа могут отличаться в зависимости от тарифа</span></div>-->
                            <!--<div class="flight-info__param">Авиакомпания:<span> Уральские Авиалинии</span></div>-->
                            <!--<div class="link link_more-rules-avia">Показать полные правила</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-details__connect-info">-->
                            <!--<div class="connect-info connect-info_fast-stop connect-info_compact"><span class="connect-info__descr"><span class="connect-info__descr-fast-stop">Быстрая пересадка – 9ч 15мин</span></span>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-details__segment">-->
                            <!--<div class="flight-info flight-info_avia">-->
                            <!--<div class="flight-info__detail">-->
                            <!--<div class="flight-info__center-section">-->
                            <!--<div class="flight-info__origin">-->
                            <!--<div class="flight-info__time">15:30</div>-->
                            <!--<div class="flight-info__city">DME Домодедово, Москва</div>-->
                            <!--<div class="flight-info__date">9 ноя, Чт</div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__destination">-->
                            <!--<div class="flight-info__time">18:30</div>-->
                            <!--<div class="flight-info__city">VIE Пулково, Вена</div>-->
                            <!--<div class="flight-info__date">13 ноя, Чт</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__airline-logo"><img src="/img/card/aura-card.svg" alt="alt"/></div>-->
                            <!--</div>-->
                            <!--<div class="flight-info__addition-params">-->
                            <!--<div class="flight-info__param">Рейс:<span> US21284</span></div>-->
                            <!--<div class="flight-info__param">Продолжительность перелёта:<span> 2 часа 30 минут</span></div>-->
                            <!--<div class="flight-info__param">Самолёт:<span> Airgus 20</span></div>-->
                            <!--<div class="flight-info__param">Услуги на борту:<span> </span></div>-->
                            <!--<div class="flight-info__param">Багаж:<span>  Нормы провоза багажа могут отличаться в зависимости от тарифа</span></div>-->
                            <!--<div class="flight-info__param">Авиакомпания:<span> Уральские Авиалинии</span></div>-->
                            <!--<div class="link link_more-rules-avia">Показать полные правила</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer-details__action"></div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--<div class="avia-offer__price-block hide-in-mobile">-->
                            <!--<div class="avia-offer__price-block-wrap">-->
                            <!--<div class="avia-offer__price">12300 ₽</div>-->
                            <!--<div class="button button_action-color"><span>КУПИТЬ</span></div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Offer from '../components/Offer';
    import vueSlider from 'vue-slider-component'

    const offersURL = 'https://api-stage.etm-system.com/api/air/offers?request_id=';

    export default {
        name: "results",
        components: {
            'offers': Offer,
            vueSlider
        },
        // props: [
        //     'request_id',
        //     'requestHeader'
        // ],
        data() {
            return {
                offers:[],
                requestStatus: '',
                requestMsg: '',
                requestHeader: [],
                // maxPrice: 0,
                max: 0,
                price: {
                    value: [0, 100],

                    width: '100%',
                    // height: 8,
                    // dotSize: 16,
                    min: 0,
                    max: 500,
                    // disabled: false,
                    // show: true,
                    // useKeyboard: true,
                    tooltip: 'always',
                    // formatter: '¥{value}',
                    // enableCross: false,
                    mergeFormatter: '¥{value1} ~ ¥{value2}',
                    bgStyle: {
                        backgroundColor: '#fff',
                        boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
                    },
                    // tooltipStyle: {
                    //     backgroundColor: '#666',
                    //     borderColor: '#666'
                    // },
                    processStyle: {
                        backgroundColor: 'blue'
                    }
                },
                offersCnt: '',
                urlOffers: '',
                request_id: '',
                api_key: '',
                isLoading: true,
                isError: false,
                isOK: false
            }
        },
        created() {
            this.request_id = this.$route.params.requestID;
            this.api_key = this.$route.params.apiKey;
            this.requestHeader = {
                headers : {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json;charset=utf-8",
                    "X-Requested-With": "XMLHttpRequest",
                    "etm-auth-key": this.api_key }
            };
            this.urlOffers = 'https://api-stage.etm-system.com/api/air/offers?request_id=' + this.request_id + '&sort=price';
            this.updateSource();
        },
        methods: {
            updateSource() {
                this.$http.get(this.urlOffers, this.requestHeader)
                    .then(response => {
                        this.requestStatus = response.body.status;
                        this.requestMsg = response.body.message;
                        this.offers = response.body.offers;
                        // console.log('status - ' + this.requestStatus);
                        // console.log('message - ' + this.requestMsg);
                        // console.log('search results - ');
                        // console.log(this.offers);
                        if(this.requestStatus === 'InProcess') {
                            setTimeout( () => {this.updateSource()} , 1000 );
                        }
                        if(this.requestStatus === 'Ready') {
                            this.isLoading = false;
                            this.isOK = true;
                            this.maxminPrices(this.offers);
                        }

                    })
                    .catch(err => {
                        console.log('status - ' + err.status);
                        console.log('error - ' + err.error);
                    })
            },
            getResults() {
                this.updateSource();
                if(this.requestStatus === 'InProcess') {
                    setTimeout( () => {this.getResults()} , 1000 );
                }
            },
            maxminPrices(obj) {
                let maxPrice = 0;
                obj.forEach(function(offer, i) {
                    offer.offers.forEach(function(item) {
                        item.segments.forEach(function(segment, j) {
                            // console.log('Offer - ' + i + ' - segment - ' + j);
                            // console.log(segment.price);
                            if( segment.price > maxPrice ) {
                                maxPrice = segment.price;
                            }
                        })
                    })
                });
                this.price.max = Math.ceil( maxPrice );
                this.price.value = [0, Math.ceil( maxPrice )];
            },
            filteredPrice() {
                let maxPrice = this.price.value[1];
                let minPrice = this.price.value[0];
                let arrOffers;

                arrOffers = this.offers.filter( offer => {
                    let segment = offer.offers.filter( segment => {

                        let arrItem = segment.segments.filter( item => {
                            return item.price < maxPrice && item.price > minPrice
                        });
                        return arrItem.length > 0;
                    });

                    return segment.length > 0;
                });
                this.offersCnt = this.countOffer(arrOffers);
                return arrOffers;
            },
            maxPrice() {
                this.max = this.price.value[1];
            },
            countOffer(obj) {
                let cnt = 0;
                obj.forEach(item => {
                    item.offers.forEach( offer => {
                        cnt += offer.segments.length;
                    })
                })
                return cnt;
            }
        }
    }
</script>

<style scoped>
    @import '../../node_modules/vue-slider-component/theme/default.css';

    .etm-filters-item__filter {
        padding-left: 20px;
        padding-right: 20px;
    }


</style>