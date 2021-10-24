<template>
	<div class="sort-options">
		<div class="sort-options-head">
			<strong class="sort-options-type">{{ title }}</strong>
			<button
				v-tooltip="{
					content: 'Сбросить выбор',
					classes: ['clear-filter']
				}"
				class="sort-options-button-res"
				@click="$emit('reset')"
			>
				<svg
					width="18"
					height="14"
					viewBox="0 0 18 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M10.6464 6.64648L13.2929 4.00004L10.6464 1.35359L11.3535 0.646484L14 3.29293L16.6464 0.646484L17.3535 1.35359L14.7071 4.00004L17.3535 6.64648L16.6464 7.35359L14 4.70714L11.3535 7.35359L10.6464 6.64648ZM2.91465 4.00003H8C8 4.34074 8.0284 4.67482 8.08296 5.00003H2.91465C2.70873 5.58263 2.15311 6.00003 1.5 6.00003C0.671573 6.00003 0 5.32846 0 4.50003C0 3.6716 0.671573 3.00003 1.5 3.00003C2.15311 3.00003 2.70873 3.41743 2.91465 4.00003ZM7.91465 8.00003H9.52779C9.86799 8.38014 10.2559 8.71661 10.6822 9.00003H7.91465C7.70873 9.58263 7.15311 10 6.5 10C5.84689 10 5.29127 9.58263 5.08535 9.00003H0.5C0.223858 9.00003 0 8.77617 0 8.50003C0 8.22389 0.223858 8.00003 0.5 8.00003H5.08535C5.29127 7.41743 5.84689 7.00003 6.5 7.00003C7.15311 7.00003 7.70873 7.41743 7.91465 8.00003ZM2.91465 12C2.70873 11.4174 2.15311 11 1.5 11C0.671573 11 0 11.6716 0 12.5C0 13.3285 0.671573 14 1.5 14C2.15311 14 2.70873 13.5826 2.91465 13H14.5C14.7761 13 15 12.7762 15 12.5C15 12.2239 14.7761 12 14.5 12H2.91465Z"
						fill="#B9B9B9"
					/>
				</svg>
			</button>
		</div>

		<PerfectScrollbar>
			<label v-if="allOption" class="checkbox">
				<input type="checkbox" @change="selectAll" :checked="areAllChecked" />
				<span class="checkbox__mark"></span>
				Все
			</label>

			<label v-for="(option, i) in options" :key="i" class="checkbox">
				<input type="checkbox" v-model="model" :value="option" />
				<span class="checkbox__mark"></span>
				{{ option.value }}
			</label>
		</PerfectScrollbar>
	</div>
</template>

<script>
import checkArraysEqualFunction from './functions/array-equal';

export default {
	name: 'FilterOptions',
	props: {
		title: {
			type: String,
			required: true
		},
		value: {
			type: Array,
			required: true
		},
		options: {
			type: Array,
			default: () => []
		},
		allOption: {
			type: Boolean,
			default: false
		},
		allOptionLabel: {
			type: String,
			default: ''
		}
	},
	computed: {
		areAllChecked() {
			if (this.allOptionLabel) {
				return checkArraysEqualFunction(
					this.value.map(obj => obj[this.allOptionLabel]),
					this.options.map(option => option[this.allOptionLabel])
				);
			}

			return false;
		},
		model: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit('change', value);
			}
		}
	},
	methods: {
		checkOptionActivity(option) {
			return this.value.includes(option.name);
		},
		selectAll() {
			this.model = this.areAllChecked ? [] : this.options;
		}
	}
};
</script>

<style lang="scss">
@import '../assets/layouts/abstracts/_variables.scss';

.sort-options {
  max-width: 240px;
  padding: 12px 0;
  background-color: $bg-filter;
  border-radius: 4px;
  margin-bottom: 12px;

	&-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 12px;
		padding: 0 12px;
	}

	&-type {
		display: block;
		font-size: 14px;
		line-height: 20px;
		font-weight: 700;
	}

	&-button-res {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 20px;
		opacity: 0;
		transition: opacity 0.2s ease;

		svg path {
			transition: fill 0.2s ease;
		}

		&:hover {
			svg path {
				fill: #7284e4;
			}
		}

		&:focus {
			opacity: 1;

			svg path {
				fill: #7284e4;
			}
		}
	}

	&:hover &-button-res {
		opacity: 1;
	}

	.ps {
		max-height: 256px;

		.ps__rail-y:hover > .ps__thumb-y,
		.ps__rail-y:focus > .ps__thumb-y,
		.ps__rail-y.ps--clicking .ps__thumb-y {
			width: 8px;
			background-color: $grey;
		}

		.ps__thumb-y {
			right: 4px;
			width: 4px;
			background-color: $grey;

			&:focus {
				outline: none;
			}
		}
	}
}

.clear-filter {
	&[x-placement^='top'] {
		margin-bottom: 22px !important;
	}
}
</style>
