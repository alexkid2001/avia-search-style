<template>
    <div class="seats-config">
        <div class="etm-input-select" @focus.capture="showDropDown = true">
            <label class="etm-input">
                <span class="etm-input__wrap">
                    <input type="text" :value="totalConfig">
                </span>
            </label>
            <div class="seats-option drop-down" v-show="showDropDown">
                <div class="seats-option__adult">
                    <div class="seats-option__left-side">
                        <div class="seats-option__title">Взрослые</div>
                        <div class="seats-option__description">18+</div>
                    </div>
                    <div class="seats-option__right-side">
                        <counter
                                :startValue="adult_cnt"
                                @changeValue="adultCnt">
                        </counter>
                    </div>
                </div>
                <div class="seats-option__child">
                    <div class="reats-option__left-side">
                        <div class="seats-option__title">Дети</div>
                        <div class="seats-option__description">до 10 лет</div>
                    </div>
                    <div class="seats-option__right-side">
                        <counter
                                :startValue="child_cnt"
                                @changeValue="childCnt">
                        </counter>
                    </div>
                </div>
                <div class="seats-option__baby">
                    <div class="reats-option__left-side">
                        <div class="seats-option__title">Дети без места</div>
                        <div class="seats-option__description">до 5 лет</div>
                    </div>
                    <div class="seats-option__right-side">
                        <counter
                            :startValue="baby_cnt"
                            @changeValue="babyCnt">
                        </counter>
                    </div>
                </div>
                <div class="seats-option__comfort comfort">
                    <!--<div class="comfort__top-line">-->
                        <!--<label class="etm-checkbox">-->
                            <!--<input type="checkbox" value="E">-->
                            <!--<div class="comfort__class">Эконом </div>-->
                        <!--</label>-->
                        <!--<label class="etm-checkbox">-->
                            <!--<input type="checkbox" value="W">-->
                            <!--<div class="comfort__class">Премиум-эконом</div>-->
                        <!--</label>-->
                    <!--</div>-->
                    <!--<div class="comfort__bottom-line">-->
                        <!--<label class="etm-checkbox">-->
                            <!--<input type="checkbox" value="F">-->
                            <!--<div class="comfort__class">Первый</div>-->
                        <!--</label>-->
                        <!--<label class="etm-checkbox">-->
                            <!--<input type="checkbox" value="B">-->
                            <!--<div class="comfort__class">Бизнес</div>-->
                        <!--</label>-->
                        <!--<label class="etm-checkbox">-->
                            <!--<input type="checkbox" value="A">-->
                            <!--<div class="comfort__class">Все</div>-->
                        <!--</label>-->

                    <!--</div>-->
                    <label class="etm-radiobutton" v-for="(val, name) in flightClasses">
                        <input type="radio"
                               v-model="flightClass"
                               :value="name">
                        <span class="comfort__class">{{flightClasses[name]}}</span>
                    </label>
                </div>
                <div class="seats-option__action">
                    <div class="seats-option-action">
                        <div class="seats-option-action__reset">
                            <div class="button"><span>Отмена</span></div>
                        </div>
                        <div class="seats-option-action__apply">
                            <div class="button"><span>Применить</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import Counter from '@/components/Counter';
    export default {
        name: "seats-config",
        components: {
            'counter': Counter
        },
        props: [
            'title',
        ],
        data() {
            return {
                flightClass: 'E',
                adult_cnt: 1,
                child_cnt: 0,
                baby_cnt: 0,
                flightClasses: {
                    "E": "Эконом",
                    "W": "Премиум Эконом",
                    "B": "Бизнес",
                    "F": "Первый"
                },
                showDropDown: ''
            }
        },
        methods: {
            adultCnt(value) {
                this.adult_cnt = value;
            },
            childCnt(value) {
                this.child_cnt = value;
            },
            babyCnt(value) {
                this.baby_cnt = value;
            },
            toggleComfort() {
                this.showDropDown = !this.showDropDown;
            }

        },
        computed: {
            totalConfig() {
                let str= '';
                str = this.adult_cnt !== 0 ? this.adult_cnt + '  Взрослый, ' : '';
                str += this.child_cnt !== 0 ? this.child_cnt + ' Ребенок, ' : '';
                str += this.baby_cnt !== 0 ? this.baby_cnt + ' Младенц, ' : '';
                str += this.flightClasses[this.flightClass];
                this.$emit('change-seats-params', this.adult_cnt, this.child_cnt, this.baby_cnt, this.flightClass)
                return  str;
            }
        },
        created() {
            let self = this;

            window.addEventListener('click', function(e){
                // close dropdown when clicked outside
                if (!self.$el.contains(e.target)){
                    self.showDropDown = false;
                }
            })
        }
    }
</script>

<style lang="scss">
    .seats-option.drop-down {
        max-width: 230px;
    }

    .search-panel__left-block {
        align-items: flex-end;
    }

    .seats-config {
        width: 100%;
    }

    .etm-radiobutton {

        input[type=radio]:checked + .comfort__class {
            background-color: #ff8584;
            color: #ffffff;
        }
    }

    .seats-option__comfort {
        .comfort__top-line>:nth-child(n+2) {
            padding: 0;
        }

        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(2, 36px);
        grid-gap: 10px;


        & > * {
            display: block;

            &:first-child  {
                grid-column-start: 1;
                grid-column-end: 3;
            }

            &:nth-child(3) {
                grid-column: 1/4;
            }

            &:nth-child(2) {
                grid-column: 3/7;
            }

            &:last-child {
                grid-column: 4/7;
            }
        }

        .comfort__class {
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            padding-left: 0;
            padding-right: 0;
        }
    }


</style>