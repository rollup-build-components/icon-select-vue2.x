<template>
  <a-select
    :value="value"
    :disabled="disabled"
    :showSearch="showSearch"
    :allowClear="allowClear"
    :placeholder="placeholder"
    optionFilterProp="label"
    dropdownClassName="s-icon-dropdown-wrapper"
    @change="doChange"
  >
    <a-select-opt-group
      v-for="group of groups"
      :label="group.title"
      :key="group.key"
    >
      <span
        slot="label"
        style="font-size: 14px"
      >{{ group.title }}</span>
      <a-select-option
        v-for="item of group.children"
        :value="item.value"
        :title="item.label"
        :label="item.label"
        :key="item.key"
      >
        <a-icon
          :type="item.value"
          style="font-size: 18px; vertical-align: middle"
        />
        <span
          class="s-icon-dropdown-hidden"
          style="padding: 0 3px; font-size: 12px; vertical-align: middle"
        >
          {{ item.label }}
        </span>
      </a-select-option>
    </a-select-opt-group>
  </a-select>
</template>

<script>
import icons from '@/icons'

export default {
  name: 'IconSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 默认描述
    placeholder: {
      type: String,
      default: ''
    },
    // 允许搜索
    showSearch: {
      type: Boolean,
      default: true
    },
    // 允许清理
    allowClear: {
      type: Boolean,
      default: true
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 图标类型
    value: {
      type: String,
      default: undefined
    }
  },
  computed: {
    groups () {
      const options = []
      for (const item of icons) {
        const option = {
          key: item.key,
          title: item.title,
          children: []
        }
        for (const child of item.icons) {
          option.children.push({
            key: child,
            label: child,
            value: child
          })
        }
        options.push(option)
      }
      return options
    }
  },
  methods: {
    /**
     * 更改事件
     */
    doChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="less">
.s-icon-dropdown-wrapper {
  .ant-select-dropdown-menu-item-group-list {
    padding-left: 8px;
    margin-bottom: 4px;
    & > .ant-select-dropdown-menu-item-selected {
      background-color: #b1d6fe;
    }
    & > .ant-select-dropdown-menu-item {
      margin: 3px 5px;
      padding: 5px 7px;
      line-height: 18px;
      display: inline-block;
      .s-icon-dropdown-hidden {
        display: none !important;
      }
    }
  }
}
</style>
