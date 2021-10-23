<template>
	<div class="card-flight">
		<div class="card-flight__col-left">
			<!-- info -->
			<div class="card-flight__info">
				<!-- airline -->
				<div class="card-flight__airline">
					<img
						:src="`https://aviata.kz/static/airline-logos/80x80/${flight.validating_carrier}.png`"
						:alt="flight.validating_carrier"
					/>
					<span class="card-flight__airline-name">
						{{ flight.itineraries[0][0].carrier_name }}
					</span>
				</div>

				<!-- date, relocation -->
				<div class="card-flight__date-wrapper">
					<div class="card-flight__date">
						<div class="card-flight__date-day">
							{{ momentMonth }}
						</div>
						<div class="card-flight__date-time">
							{{ momentTime }}
						</div>
					</div>

					<div class="card-flight__relocation">
						<div class="card-flight__relocation-wrapper">
							<div class="card-flight__relocation-city">
								{{ firstSegment.origin_code }}
							</div>
							<div class="card-flight__relocation-time">
								{{ getTime(flight.best_time) }}
							</div>
							<div class="card-flight__relocation-city">
								{{ lastSegment.dest_code }}
							</div>
						</div>
						<div class="card-flight__relocation-range">
							<div></div>
							<div :style="isDirect ? { visibility: 'hidden' } : {}"></div>
							<div></div>
						</div>
						<div
							v-if="!isDirect"
							class="card-flight__relocation-transit ta-center"
						>
							через {{ firstSegment.dest }}
						</div>
					</div>

					<div class="card-flight__date">
						<div class="card-flight__date-day">
							{{ momentArrMonth }}
						</div>
						<div class="card-flight__date-time">
							{{ momentArrTime }}
						</div>
					</div>
				</div>
			</div>

			<!-- actions -->
			<div class="card-flight__actions">
				<div class="card-flight__btn-group">
					<button class="btn-dashed">Детали перелета</button>
					<button class="btn-dashed">Условия тарифа</button>
				</div>
				<div class="card-flight__recovery">
					<span class="card-flight__text">
						{{ flight.refundable ? 'возвратный' : 'невозвратный' }}
					</span>
				</div>
			</div>
		</div>

		<div class="card-flight__col-right">
			<div class="card-flight__price ta-center">
				{{ flight.price  }} ₸
			</div>
			<button class="card-flight__btn-buy">Выбрать</button>
			<div class="card-flight__text-additional ta-center">
				<span class="card-flight__text ta-center">Цена за всех пассажиров</span>
			</div>
			<div class="card-flight__baggage">
				<span class="card-flight__text tc-dark">
					{{
						firstSegment.baggage_options[0].value
							? `Багаж: ${firstSegment.baggage_options[0].value} кг`
							: 'Нет багажа'
					}}
				</span>
				<button class="card-flight__baggage-btn">+ Добавить багаж</button>
			</div>
		</div>
	</div>
</template>

<script>
import thousandSeparatorFilter from './filters/thousand-separator.filter';
import momentFilter from './filters/moment.filter';
import moment from 'moment';

export default {
	name: 'CardFlight',
	props: {
		flight: {
			type: Object,
			required: true
		}
	},
	filters: {
		thousandSeparator: thousandSeparatorFilter,
		date: momentFilter
	},
	computed: {
		isDirect() {
			return this.flight.itineraries[0][0].stops === 0;
		},
		firstSegment() {
			return this.flight.itineraries[0][0].segments[0];
		},
		lastSegment() {
			const segmentsLength = this.flight.itineraries[0][0].segments.length;
			return this.flight.itineraries[0][0].segments[segmentsLength - 1];
		},
		momentMonth(){
			var d = new Date(this.flight.itineraries[0][0].dep_date);
			return moment(d).format('MMM  D ddd');
		},
		momentTime(){
			var d = new Date(this.flight.itineraries[0][0].dep_date);
			return moment(d).format('LT');
		},
		momentArrMonth(){
			var d = new Date(this.flight.itineraries[0][0].arr_date);
			return moment(d).format('MMM  D ddd');
		},
		momentArrTime(){
			var d = new Date(this.flight.itineraries[0][0].arr_date);
			return moment(d).format('LT');
		}
	},
	methods: {
		getTime(seconds) {
			const days = Math.floor(seconds / (3600 * 24));
			const hours = Math.floor((seconds % (3600 * 24)) / 3600);
			const minutes = Math.floor((seconds % 3600) / 60);

			const daysDisplay = days > 0 ? `${days} д ` : '';
			const hoursDisplay = hours > 0 ? `${hours} ч ` : '';
			const minutesDisplay = minutes > 0 ? `${minutes} м` : '';

			return (daysDisplay + hoursDisplay + minutesDisplay)
				.replace(/\s+/g, ' ')
				.trim();
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/layouts/abstracts/_variables.scss";

.card-flight {
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	margin-bottom: 12px;
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

	&:last-child {
		margin-bottom: 0;
	}

	&__col {
		&-left {
			flex-grow: 1;
			padding: 40px 44px 18px;
		}

		&-right {
			flex-basis: 240px;
			padding: 12px 20px 15px;
			background-color: #f5f5f5;
		}
	}

	&__info {
		display: flex;
		align-items: center;
		margin-bottom: 46px;
	}

	&__actions {
		display: flex;
		align-items: center;
	}

	&__btn-group {
		margin-right: 46px;

		button {
			margin-right: 23px;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	&__text {
		font-size: 12px;
		line-height: 14px;
		color: #707276;
	}

	&__recovery {
		display: flex;
		align-items: center;

		&:before {
			content: '';
			width: 16px;
			height: 16px;
			margin-right: 7px;
			background: url('~@/assets/images/recovery.svg') center no-repeat;
			background-size: contain;
		}
	}

	&__price {
		font-size: 18px;
		line-height: 20px;
		margin-bottom: 13px;
	}

	&__btn-buy {
		display: block;
		width: 100%;
		margin-bottom: 8px;
		padding: 8px 12px;
		font-size: 18px;
		line-height: 24px;
		font-weight: 700;
		color: #fff;
		background-color: $green;
		border-radius: 4px;
		transition: background-color 0.2s;

		&:hover,
		&:focus {
			background-color: #48a005;
		}
	}

	&__baggage {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 12px;

		&-btn {
			padding: 4px 8px;
			font-size: 12px;
			line-height: 16px;
			font-weight: 600;
			color: #5763b3;
			background-color: #eaf0fa;
			border-radius: 2px;
			transition: background-color 0.2s;

			&:hover,
			&:focus {
				background-color: #d3e3fd;
			}
		}
	}

	&__airline {
		display: flex;
		align-items: center;
		width: 127px;
		margin-right: 13px;

		img {
			width: 20px;
			height: auto;
			margin-right: 12px;
		}

		&-name {
			font-size: 14px;
			line-height: 19px;
			font-weight: 600;
		}
	}

	&__date {
		&:first-child {
			margin-right: 27px;
		}

		&:last-child {
			margin-left: 31px;
		}

		&-wrapper {
			display: flex;
		}

		&-day {
			white-space: nowrap;
			text-transform: lowercase;
			font-size: 12px;
			line-height: 16px;
		}

		&-time {
			font-size: 24px;
			line-height: 32px;
			font-weight: 600;
		}
	}

	&__relocation {
		width: 168px;

		&-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 4px;
		}

		&-city {
			font-size: 10px;
			line-height: 12px;
			color: $grey;
		}

		&-time {
			font-size: 12px;
			line-height: 18px;
		}

		&-range {
			position: relative;
			width: 100%;
			height: 1px;
			background-color: $grey;

			div {
				position: absolute;
				top: 50%;
				width: 5px;
				height: 5px;
				background-color: #fff;
				border: 1px solid $grey;
				border-radius: 50%;
				transform: translateY(-50%);

				&:first-child {
					left: 0;
				}

				&:nth-child(2) {
					left: 50%;
					transform: translate(-50%, -50%);
				}

				&:last-child {
					right: 0;
				}
			}
		}

		&-transit {
			margin-top: 4.5px;
			font-size: 12px;
			line-height: 16px;
			color: #ff9900;
		}
	}

	@media screen and (max-width: 1140px) {
		&__col-right {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		&__info {
			flex-direction: column;
			align-items: flex-start;
			margin-bottom: 24px;
		}

		&__airline {
			margin-right: 0;
			margin-bottom: 24px;
		}

		&__baggage {
			flex-direction: column;

			&-btn {
				margin-top: 10px;
			}
		}
	}

	@media screen and (max-width: 1024px) {
		&__col-left {
			padding: 25px 25px 18px;
		}

		&__actions {
			flex-direction: column;
			align-items: flex-start;
		}

		&__btn-group {
			margin-right: 0;
			margin-bottom: 12px;
		}

		&__btn-buy {
			font-size: 16px;
			line-height: 20px;
		}
	}

	@media screen and (max-width: 650px) {
		flex-direction: column;

		&__col-right {
			flex-basis: auto;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: flex-start;
		}

		&__price {
			order: 2;
			margin-bottom: 0;
		}

		&__text-additional {
			display: none;
		}

		&__btn-buy {
			order: 1;
			width: 180px;
			margin-right: 24px;
			margin-bottom: 0;
		}

		&__baggage {
			order: 3;
			align-items: flex-end;
			margin-top: 0;
			margin-left: auto;
		}
	}

	@media screen and (max-width: 520px) {
		&__date {
			&:first-child {
				margin-right: 0;
			}

			&:last-child {
				margin-left: 0;
			}

			&-wrapper {
				width: 100%;
				justify-content: space-between;
			}
		}

		&__relocation {
			width: 100%;
			margin-right: 30px;
			margin-left: 30px;
		}

		&__baggage {
			width: 100%;
			align-items: flex-start;
			margin-top: 16px;
		}

		&__btn-buy {
			width: 50%;
		}
	}

	@media screen and (max-width: 380px) {
		&__col {
			&-left {
				padding: 20px 20px 16px;
			}

			&-right {
				padding: 16px 20px;
			}
		}

		&__date-time {
			font-size: 20px;
		}

		&__relocation {
			margin-right: 15px;
			margin-left: 15px;

			&-time,
			&-city {
				font-size: 10px;
			}
		}
	}
}
</style>
