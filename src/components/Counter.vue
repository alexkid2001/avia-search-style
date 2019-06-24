<template>
    <div class="counter">
        <div class="counter__btn counter__btn_minus"
            @click="clickMinus"
            :class="classDisabledMinus">
        </div>
        <div class="counter__value">{{value}}</div>
        <div class="counter__btn counter__btn_plus"
            @click="clickPlus"
            :class="classDisabledPlus">
        </div>
    </div>
</template>

<script>
    const maxValue = 10;
    export default {
        name: "counter",
        props: {
            'startValue': Number
        },
        data() {
            return {
                value: this.startValue,
                minusDisables: false,
                plusDisables: false,
                minValue: this.startValue
            }
        },
        methods: {
            clickPlus() {
                if(this.value < maxValue) {
                    this.value++;
                    this.$emit('changeValue', this.value);
                }
            },
            clickMinus() {
                if(this.value > this.minValue) {
                    this.value--;
                    this.$emit('changeValue', this.value);
                }
            }
        },
        computed: {
            classDisabledMinus () {
                if(this.value === this.minValue) {
                    return 'disabled'
                }
            },

            classDisabledPlus() {
                if(this.value === maxValue) {
                    return 'disabled'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .counter {
        &__btn {
            width: 22px;
            height: 22px;
            cursor: pointer;
            border-radius: 2px;
            position: relative;

            &:before {

                font-family: 'iconetm';
                position: absolute;
                font-size: 22px;
                top: 0;
                left: 0;
                color: #ff8584;
            }

            &_plus {
                &:before {
                    content: '\e93e';
                }
            }

            &_minus {
                &:before {
                    content: '\e93f';
                }
            }

            &.disabled {
                opacity: .5;
                pointer-events: none;
            }
        }
    }

</style>