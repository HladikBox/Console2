<template>
  <div class="padding">
    <div v-if="appinfo!=null&&modelinfo!=null">
      <div class="flex-row">
        <div class="flex-1">
          <el-page-header @back="goBack" :content="modelinfo.name"></el-page-header>
        </div>
        <div>
          <el-button type="success" @click="updatedb">只更新数据结构</el-button>
          <el-button type="info" @click="savemodel(false)">只保存模型</el-button>
          <el-button type="primary" @click="savemodel(true)">保存模型并更新数据结构</el-button>
        </div>
      </div>
      <el-tabs v-model="activeName" :tab-position="'left'" class="margin-top">
        <el-tab-pane label="基础设计" name="基础设计">
          <div class="padding-left">
            <div class="containter">
              <div class="h3 bolder">基础设计</div>
              <div class="flex-row flex-center margin-top">
                <div class="width">模型名称</div>
                <div class="width">
                  <el-input v-model="modelinfo.name"></el-input>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">数据库表</div>
                <div class="width-4x">
                  <el-input type="textarea" v-model="modelinfo.tablename" autosize></el-input>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">强制搜索条件</div>
                <div class="width-4x">
                  <el-input type="textarea" v-model="modelinfo.searchcondition" autosize></el-input>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">模型描述</div>
                <div class="width-4x">
                  <el-input type="textarea" v-model="modelinfo.description" autosize></el-input>
                </div>
              </div>
              <el-divider></el-divider>

              <div class="flex-row flex-center margin-top">
                <div class="width">单条数据模式</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.nolist=='1'"
                    @change="modelinfo.nolist=modelinfo.nolist=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">允许导入数据</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.import=='1'"
                    @change="modelinfo.import=modelinfo.import=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">允许导出数据</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.export=='1'"
                    @change="modelinfo.export=modelinfo.export=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">仅查看不保存</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.nosave=='1'"
                    @change="modelinfo.nosave=modelinfo.nosave=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">不需要新增</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.noaddnew=='1'"
                    @change="modelinfo.noaddnew=modelinfo.noaddnew=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">允许列表全选</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.canselectall=='1'"
                    @change="modelinfo.canselectall=modelinfo.canselectall=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
              <div class="flex-row flex-center margin-top">
                <div class="width">记录操作记录</div>
                <div class="width">
                  <el-switch
                    :value="modelinfo.recording=='1'"
                    @change="modelinfo.recording=modelinfo.recording=='1'?'0':'1'"
                  ></el-switch>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="字段设计" name="字段设计">
          <div class="padding-left">
            <div class="containter">
              <div class="flex-row flex-center">
                <div class="h3 bolder margin-right">字段设计</div>
                <div>
                  <i class="el-icon-circle-plus h3 f-p pointer" @click="addnewfield"></i>
                </div>
              </div>
              <div class="margin-top">
                <el-table :data="modelinfo.fields.field" style="width: 100%" class="fieldtable">
                  <el-table-column label="字段名称" class="width" fixed>
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.name" class="width-1x"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="数据库字段" class="width" fixed>
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.key" class="width-1x"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="字段类型" class="width" fixed>
                    <template slot-scope="scope">
                      <el-select
                        size="small"
                        v-model="scope.row.type"
                        placeholder="请选择"
                        class="width-1x"
                      >
                        <el-option
                          v-for="item in fieldtypelist"
                          :key="item.type"
                          :label="item.name"
                          :value="item.type"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>

                  <el-table-column label="列表显示">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.displayinlist==1"
                        @change="scope.row.displayinlist=(scope.row.displayinlist==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="搜索条件">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.search==1"
                        @change="scope.row.search=(scope.row.search==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="必录字段">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.notnull==1"
                        @change="scope.row.notnull=(scope.row.notnull==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="不可编辑">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.disableindetail==1"
                        @change="scope.row.disableindetail=(scope.row.disableindetail==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="不保存">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.nosave==1"
                        @change="scope.row.nosave=(scope.row.nosave==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="不显示">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.hidden==1"
                        @change="scope.row.hidden=(scope.row.hidden==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="列表编辑">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.canedit==1"
                        @change="scope.row.canedit=(scope.row.canedit==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="唯一">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.unique==1"
                        @change="scope.row.unique=(scope.row.unique==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="组合唯一">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.unionunique==1"
                        @change="scope.row.unionunique=(scope.row.unionunique==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button @click="editfield(scope)" type="text" size="small">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="margin-top">
                  <el-button @click="addnewfield" type="primary">添加字段</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务设计" name="服务设计">
          <div class="padding-left">
            <div class="containter">
              <div class="flex-row flex-center">
                <div class="h3 bolder margin-right">服务设计</div>
                <div>
                  <i class="el-icon-circle-plus h3 f-p pointer" @click="addnewservice"></i>
                </div>
              </div>
              <div class="margin-top">
                <el-table :data="modelinfo.options.option" style="width: 100%" class="fieldtable">
                  <el-table-column label="服务名称">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="服务类型">
                    <template slot-scope="scope">
                      <el-select size="small" v-model="scope.row.type" placeholder="请选择">
                        <el-option
                          v-for="item in optiontypelist"
                          :key="item.type"
                          :label="item.name"
                          :value="item.type"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="自定义内容" width="400">
                    <template slot-scope="scope">
                      <el-input type="textarea" size="small" v-model="scope.row.function"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="详情页显示">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.detail==1"
                        @change="scope.row.detail=(scope.row.detail==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="列表页显示">
                    <template slot-scope="scope">
                      <el-checkbox
                        :value="scope.row.search==1"
                        @change="scope.row.search=(scope.row.search==1)?0:1"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="服务描述" width="400">
                    <template slot-scope="scope">
                      <el-input
                        type="textarea"
                        placeholder="本字段的相关描述，防止以后忘记这个字段干嘛用"
                        size="small"
                        v-model="scope.row.description"
                      ></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图表设计" name="图表设计">
          <div class="padding-left">
            <div class="containter">
              <div class="flex-row flex-center">
                <div class="h3 bolder margin-right">图表设计</div>
                <div>
                  <i class="el-icon-circle-plus h3 f-p pointer" @click="addnewcharts"></i>
                  <i class="el-icon-question h3 pointer"></i>
                </div>
              </div>
              <div class="margin-top">
                <el-table :data="modelinfo.charts.chart" style="width: 100%" class="fieldtable">
                  <el-table-column label="图表名称">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="图表类型">
                    <template slot-scope="scope">
                      <el-select size="small" v-model="scope.row.type" placeholder="请选择">
                        <el-option
                          v-for="item in charttypelist"
                          :key="item.type"
                          :label="item.name"
                          :value="item.type"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="字段设置">
                    <template slot-scope="scope">
                      <div class="flex-row flex-center">
                        <div class="width-1x">常规字段</div>
                        <div>
                          <el-select size="small" v-model="scope.row.field" placeholder="请选择">
                            <el-option
                              v-for="item in modelinfo.fields.field"
                              :key="item.key"
                              :label="item.name"
                              :value="item.key"
                            ></el-option>
                          </el-select>
                        </div>
                      </div>
                      <div class="flex-row flex-center margin-top">
                        <div class="width-1x">日期字段</div>
                        <div>
                          <el-select
                            size="small"
                            v-model="scope.row.datetimefield"
                            placeholder="请选择"
                          >
                            <template v-for="item in modelinfo.fields.field">
                              <el-option
                                v-if="item.type=='datetime'"
                                :key="item.key"
                                :label="item.name"
                                :value="item.key"
                              ></el-option>
                            </template>
                          </el-select>
                        </div>
                      </div>
                      <div class="flex-row flex-center margin-top">
                        <div class="width-1x">隔离字段</div>
                        <div>
                          <el-select size="small" v-model="scope.row.statusfield" placeholder="请选择">
                            <template v-for="item in modelinfo.fields.field">
                              <el-option
                                v-if="item.type=='select'||item.type=='fkey'"
                                :key="item.key"
                                :label="item.name"
                                :value="item.key"
                              ></el-option>
                            </template>
                          </el-select>
                        </div>
                      </div>
                      <div class="flex-row flex-center margin-top">
                        <div class="width-1x">数值字段</div>
                        <div>
                          <el-select size="small" v-model="scope.row.numberfield" placeholder="请选择">
                            <template v-for="item in modelinfo.fields.field">
                              <el-option
                                v-if="item.type=='number'"
                                :key="item.key"
                                :label="item.name"
                                :value="item.key"
                              ></el-option>
                            </template>
                          </el-select>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="描述" width="400">
                    <template slot-scope="scope">
                      <el-input
                        type="textarea"
                        placeholder="本字段的相关描述，防止以后忘记这个字段干嘛用"
                        size="small"
                        v-model="scope.row.description"
                      ></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="前端JS" name="前端JS">
          
        </el-tab-pane>
        <el-tab-pane label="后台PHP" name="后台PHP"></el-tab-pane>
        <el-tab-pane label="CSS" name="CSS"></el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="字段详情"
      :visible.sync="showfieldedit"
      center
      width="800"
      :close-on-click-modal="false"
    >
      <div class="padding">
        <div class="flex-row flex-center">
          <div class="width-1x">
            <span class="f-d">*</span>字段名称
          </div>
          <div class="flex-1 margin-right">
            <el-input class="w-100" v-model="fieldinfo.name"></el-input>
          </div>
          <div class="width-1x">
            <span class="f-d">*</span>数据库名称
          </div>
          <div class="flex-1 margin-right">
            <el-input class="w-100" v-model="fieldinfo.key"></el-input>
          </div>
        </div>
        <div class="flex-row flex-center margin-top">
          <div class="width-1x">
            <span class="f-d">*</span>字段类型
          </div>
          <div class="flex-1 margin-right">
            <el-select placeholder="请选择" class="w-100" v-model="fieldinfo.type">
              <el-option
                v-for="item in fieldtypelist"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </div>
          <div class="width-1x"></div>
          <div class="flex-1 margin-right"></div>
        </div>
        <div class="flex-row flex-center margin-top">
          <div class="width-1x">字段描述</div>
          <div class="flex-1 margin-right">
            <el-input class="w-100" v-model="fieldinfo.description"></el-input>
          </div>
        </div>
        <div class="flex-row flex-wrap flex-center margin-top">
          <div class="margin-right margin-bottom">
            <el-checkbox
              :value="fieldinfo.displayinlist==1"
              @change="fieldinfo.displayinlist=(fieldinfo.displayinlist==1)?0:1"
            >列表搜索结果显示</el-checkbox>
          </div>
          <div class="margin-right margin-bottom">
            <el-checkbox
              :value="fieldinfo.search==1"
              @change="fieldinfo.search=(fieldinfo.search==1)?0:1"
            >列表页搜索条件</el-checkbox>
          </div>
          <div class="margin-right margin-bottom">
            <el-checkbox
              :value="fieldinfo.notnull==1"
              @change="fieldinfo.notnull=(fieldinfo.notnull==1)?0:1"
            >必录字段</el-checkbox>
          </div>
          <div class="margin-right margin-bottom">
            <el-checkbox
              :value="fieldinfo.disableindetail==1"
              @change="fieldinfo.disableindetail=(fieldinfo.disableindetail==1)?0:1"
            >不可编辑</el-checkbox>
          </div>
          <div class="margin-right margin-bottom">
            <el-checkbox
              :value="fieldinfo.nosave==1"
              @change="fieldinfo.nosave=(fieldinfo.nosave==1)?0:1"
            >不保存</el-checkbox>
          </div>
          <div class="margin-right margin-bottom">
            <el-checkbox
              :value="fieldinfo.hidden==1"
              @change="fieldinfo.hidden=(fieldinfo.hidden==1)?0:1"
            >不显示</el-checkbox>
          </div>
          <div class="margin-right margin-bottom">
            <el-checkbox
              :value="fieldinfo.canedit==1"
              @change="fieldinfo.canedit=(fieldinfo.canedit==1)?0:1"
            >允许列表编辑</el-checkbox>
          </div>
          <div class="margin-right margin-bottom">
            <el-checkbox
              :value="fieldinfo.unique==1"
              @change="fieldinfo.unique=(fieldinfo.unique==1)?0:1"
            >唯一</el-checkbox>
          </div>
          <div class="margin-right margin-bottom">
            <el-checkbox
              :value="fieldinfo.unionunique==1"
              @change="fieldinfo.unionunique=(fieldinfo.unionunique==1)?0:1"
            >组合唯一</el-checkbox>
          </div>
        </div>
        <el-divider
          content-position="left"
          v-if="(fieldinfo.type==''||fieldinfo.type=='html'||fieldinfo.type=='password')==false"
        >字段特有属性</el-divider>
        <div v-if="fieldinfo.type=='text'">
          <div class="flex-row flex-center">
            <div class="width-1x">格式化</div>
            <div class="flex-1 margin-right">
              <el-input
                class="w-100"
                placeholder="输入正则表达式，当用户的提交的数据不符合正则要求，则报错提示。"
                v-model="fieldinfo.format"
              ></el-input>
            </div>
            <div class="width-1x">默认值</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder="新增时自动填充的默认值" v-model="fieldinfo.default"></el-input>
            </div>
            <div class="width-1x">
              <el-checkbox
                :value="fieldinfo.strict==1"
                @change="fieldinfo.strict=(fieldinfo.strict==1)?0:1"
              >严格搜索</el-checkbox>
            </div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='url'">
          <div class="flex-row flex-center">
            <div class="width-1x">默认值</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder="新增时自动填充的默认值" v-model="fieldinfo.default"></el-input>
            </div>
            <div class="width-1x">字段类型</div>
            <div class="flex-1">
              <el-select placeholder="请选择" class="w-100" v-model="fieldinfo.filetype">
                <el-option
                  v-for="item in urlfiletypelist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='check'">
          <div class="flex-row flex-center">
            <div class="width-1x">
              <el-checkbox
                :value="fieldinfo.default==1"
                @change="fieldinfo.default=(fieldinfo.default==1)?0:1"
              >默认选中</el-checkbox>
            </div>
            <div class="width-1x">选中值</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder="显示在列表界面的中选中的值" v-model="fieldinfo.yvalue"></el-input>
            </div>
            <div class="width-1x">不选值</div>
            <div class="flex-1">
              <el-input class="w-100" placeholder="显示在列表界面的中不选中的值" v-model="fieldinfo.nvalue"></el-input>
            </div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='longtext'">
          <div class="flex-row flex-center">
            <div class="width-1x">默认值</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder="新增时自动填充的默认值" v-model="fieldinfo.default"></el-input>
            </div>
            <div class="width-1x">
              <el-checkbox
                :value="fieldinfo.strict==1"
                @change="fieldinfo.strict=(fieldinfo.strict==1)?0:1"
              >严格搜索</el-checkbox>
            </div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='select'">
          <div class="flex-row">
            <div class="width-1x margin-top-1x">
              <div>可选项</div>
              <div class="margin-top-1x">
                <el-button type="primary" size="mini" @click="addselectoption">添加选项</el-button>
              </div>
            </div>
            <div class="flex-1">
              <el-table :data="fieldinfo.options.option" style="width: 100%">
                <el-table-column label="显示值">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.name" placeholder="显示给用户看的值"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="存储值">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.value" placeholder="存储到数据库的值"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="颜色">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.color" placeholder="其实应该是tag才对的"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="margin-top">
            <el-checkbox
              :value="fieldinfo.listfilter==1"
              @change="fieldinfo.listfilter=(fieldinfo.listfilter==1)?0:1"
            >列表状态过滤</el-checkbox>
          </div>
        </div>
        <div v-if="fieldinfo.type=='number'">
          <div class="flex-row flex-center">
            <div class="width-1x">
              <el-checkbox
                :value="fieldinfo.isdecimal==1"
                @change="fieldinfo.isdecimal=(fieldinfo.isdecimal==1)?0:1"
              >带小数</el-checkbox>
            </div>
            <div class="width-1x">最大值</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder v-model="fieldinfo.maxvalue"></el-input>
            </div>
            <div class="width-1x">最小值</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder v-model="fieldinfo.minvalue"></el-input>
            </div>
            <div class="width-1x">单位</div>
            <div class="flex-1">
              <el-input class="w-100" placeholder v-model="fieldinfo.unit"></el-input>
            </div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='datetime'">
          <div class="flex-row flex-center">
            <div class="width-1x">
              <el-checkbox
                :value="fieldinfo.onlydate==1"
                @change="fieldinfo.onlydate=(fieldinfo.onlydate==1)?0:1"
              >仅日期</el-checkbox>
            </div>
            <div class="margin-right">默认值(填写now为系统时间)</div>
            <div class="flex-1">
              <el-input class="w-100" placeholder v-model="fieldinfo.default"></el-input>
            </div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='upload'">
          <div class="flex-row flex-center">
            <div class="width-1x">文件夹</div>
            <div class="flex-1 margin-right">
              <el-input
                class="w-100"
                placeholder="上传的文件将会在upload目录下面"
                v-model="fieldinfo.uploadmodule"
              ></el-input>
            </div>
            <div class="width-1x">字段类型</div>
            <div class="flex-1">
              <el-select placeholder="请选择" class="w-100" v-model="fieldinfo.filetype">
                <el-option
                  v-for="item in urlfiletypelist"
                  :key="item.type"
                  :label="item.name"
                  :value="item.type"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='grid'">
          <div class="flex-row">
            <div class="width-1x margin-top-1x">
              <div>下级数据来源</div>
              <div class="margin-top-1x">
                <el-button type="primary" size="mini" @click="loadModelList">刷新数据</el-button>
              </div>
            </div>
            <div class="flex-1 margin-right">
              <el-select v-model="fieldinfo.fkey" placeholder="请选择" class="w-100">
                <el-option-group
                  v-for="group in selectmodellist"
                  :key="group.modelname"
                  :label="group.name+' - '+group.modelname"
                >
                  <el-option
                    v-for="item in group.selectfield"
                    :key="item.modelname+'-'+item.key"
                    :label="item.name+' - '+item.key"
                    :value="item.modelname+'-'+item.key"
                  ></el-option>
                </el-option-group>
              </el-select>
            </div>
            <div class="width margin-top-1x">
              <el-checkbox
                :value="fieldinfo.cannotnew==1"
                @change="fieldinfo.cannotnew=(fieldinfo.cannotnew==1)?0:1"
              >不允许新增</el-checkbox>
            </div>
            <div class="width margin-top-1x">
              <el-checkbox
                :value="fieldinfo.candelete==1"
                @change="fieldinfo.candelete=(fieldinfo.candelete==1)?0:1"
              >允许删除</el-checkbox>
            </div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='fkey'">
          <div class="flex-row flex-center">
            <div class="width-1x">关联表</div>
            <div class="flex-1 margin-right">
              <el-input
                class="w-100"
                placeholder="将会在这个表中进行查询获取，可以写视图"
                v-model="fieldinfo.tablename"
              ></el-input>
            </div>
            <div class="width-1x">关联表别名</div>
            <div class="flex-1 margin-right">
              <el-input
                class="w-100"
                placeholder="请设置一个别名，请注意不要使用r_main或者和其它字段的别名重复"
                v-model="fieldinfo.ntbname"
              ></el-input>
            </div>
          </div>
          <div class="flex-row flex-center margin-top">
            <div class="width-1x">查找条件</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder="搜索，排序SQL条件" v-model="fieldinfo.condition"></el-input>
            </div>
            <div class="width-1x">显示字段</div>
            <div class="flex-1 margin-right">
              <el-input
                class="w-100"
                placeholder="显示在下拉菜单的字段，可以按照sql语句编写"
                v-model="fieldinfo.displayfield"
              ></el-input>
            </div>
          </div>
          <div class="flex-row flex-center margin-top">
            <div class="width">
              <el-checkbox
                :value="fieldinfo.ajax==1"
                @change="fieldinfo.ajax=(fieldinfo.ajax==1)?0:1"
              >异步加载</el-checkbox>
            </div>
            <div class="width">
              <el-checkbox
                :value="fieldinfo.showview==1"
                @change="fieldinfo.showview=(fieldinfo.showview==1)?0:1"
              >关联数据查看</el-checkbox>
            </div>
            <div class="width-1x">模型名称</div>
            <div class="flex-1">
              <el-input class="w-100" placeholder="模型名称" v-model="fieldinfo.viewmodel"></el-input>
            </div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='flist'">
          <div class="flex-row flex-center">
            <div class="width-1x">关联表</div>
            <div class="flex-1 margin-right">
              <el-input
                class="w-100"
                placeholder="将会在这个表中进行查询获取，可以写视图"
                v-model="fieldinfo.tablename"
              ></el-input>
            </div>
            <div class="width-1x">关联表别名</div>
            <div class="flex-1 margin-right">
              <el-input
                class="w-100"
                placeholder="请设置一个别名，请注意不要使用r_main或者和其它字段的别名重复"
                v-model="fieldinfo.ntbname"
              ></el-input>
            </div>
          </div>
          <div class="flex-row flex-center margin-top">
            <div class="width-1x">查找条件</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder="搜索，排序SQL条件" v-model="fieldinfo.condition"></el-input>
            </div>
            <div class="width-1x">显示字段</div>
            <div class="flex-1 margin-right">
              <el-input
                class="w-100"
                placeholder="显示在下拉菜单的字段，可以按照sql语句编写"
                v-model="fieldinfo.displayfield"
              ></el-input>
            </div>
          </div>
          <div class="flex-row flex-center margin-top">
            <div class="width-1x">外表存储</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder="使用外表存储数据" v-model="fieldinfo.relatetable"></el-input>
            </div>
            <div class="width-1x"></div>
            <div class="flex-1"></div>
          </div>
        </div>
        <div v-if="fieldinfo.type=='color'">
          <div class="flex-row flex-center">
            <div class="width-1x">默认值</div>
            <div class="flex-1 margin-right">
              <el-input class="w-100" placeholder="新增时自动填充的默认" v-model="fieldinfo.default"></el-input>
            </div>
            <div class="width-1x"></div>
            <div class="flex-1"></div>
          </div>
        </div>
        <div class="text-center margin-top-4x">
          <el-button
            type="primary"
            :disabled="fieldinfo.name==''||fieldinfo.key==''||fieldinfo.type==''"
            @click="savefield"
          >保存</el-button>
          <el-button @click="showfieldedit=false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Config from "../Config";
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { Utils } from "../Utils";

export default {
  props: {
    appinfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      Res: {},
      Inst: {},
      Member: null,
      showproductinfo: false,
      modelname: "",
      modelinfo: null,
      activeName: "前端JS",
      showfieldedit: false,
      fieldchangeseq: -1,
      fieldinfo: {},
      modellist: [],
      selectmodellist: [],
      charttypelist: [
        { name: "时间数值折线图报表", type: "timeline" },
        { name: "时间数值柱状图报表", type: "timecolumn" },
        { name: "柱状比较图报表", type: "column" },
        { name: "饼状分析报表", type: "pie" },
      ],
      optiontypelist: [
        { name: "新增", type: "addnew" },
        { name: "删除", type: "delete" },
        { name: "自定义JS方法", type: "function" },
        { name: "自定义超链接", type: "link" },
      ],
      fieldtypelist: [
        { name: "文本", type: "text" },
        { name: "密码", type: "password" },
        { name: "选中", type: "check" },
        { name: "下拉", type: "select" },
        { name: "数值", type: "number" },
        { name: "文件上传", type: "upload" },
        { name: "日期", type: "datetime" },
        { name: "表关联下拉", type: "fkey" },
        { name: "表关联多选", type: "flist" },
        { name: "网络链接", type: "url" },
        { name: "颜色", type: "color" },
        { name: "下级数据", type: "grid" },
        { name: "长文本", type: "longtext" },
        { name: "HTML编辑", type: "html" },
      ],
      urlfiletypelist: [
        { name: "图片", type: "image" },
        { name: "视频", type: "video" },
        { name: "音频", type: "audio" },
        { name: "下载文件", type: "file" },
        { name: "网页", type: "web" },
      ],
      uploadmodule: this.modelname,
    };
  },
  created() {
    PageHelper.Init(this);
    PageHelper.LoginAuth(this);
    this.modelname = this.$route.params.modelname;
    HttpHelper.Post("model/info", {
      appalias: this.appinfo.alias,
      modelname: this.modelname,
    }).then((modelinfo) => {
      this.modelinfo = modelinfo;
    });
    this.loadModelList();
  },
  methods: {
    loadModelList() {
      HttpHelper.Post("app/modellist", { appalias: this.appinfo.alias }).then(
        (modellist) => {
          this.modellist = modellist;
          var selectmodellist = [];
          for (var i = 0; i < this.modellist.length; i++) {
            var selectfield = [];
            for (var j = 0; j < this.modellist[i].fields.field.length; j++) {
              var item = this.modellist[i].fields.field[j];
              console.log("loadModelList", item, item.type, item.search);
              if (item.type == "fkey" && item.search == "1") {
                selectfield.push(item);
              }
            }
            if (selectfield.length > 0) {
              this.modellist[i].selectfield = selectfield;
              selectmodellist.push(this.modellist[i]);
            }
          }
          this.selectmodellist = selectmodellist;
        }
      );
    },
    savefield() {
      if (this.fieldchangeseq == -1) {
        this.modelinfo.fields.field.push(this.fieldinfo);
      } else {
        this.$set(
          this.modelinfo.fields.field,
          this.fieldchangeseq,
          this.fieldinfo
        );
      }
      this.showfieldedit = false;
    },
    addnewfield() {
      this.showfieldedit = true;
      this.fieldchangeseq = -1;
      this.fieldinfo = this.getDefaultField();
    },
    getDefaultField() {
      return {
        name: "",
        key: "",
        type: "",
        description: "",
        displayinlist: 0,
        search: 0,
        notnull: 0,
        disableindetail: 0,
        nosave: 0,
        hidden: 0,
        canedit: 0,
        unique: 0,
        unionunique: 0,
        format: "",
        default: "",
        strict: 0,
        filetype: "image",
        yvalue: "是",
        nvalue: "否",
        listfilter: 0,
        options: {
          option: [
            { name: "", value: "", color: "" },
            { name: "", value: "", color: "" },
          ],
        },
        isdecimal: 0,
        maxvalue: "",
        minvalue: "",
        unit: "",
        onlydate: 0,
        fkey: 0,
        cannotnew: 0,
        candelete: 0,
        tablename: "",
        ntbname: "",
        condition: "",
        displayfield: "",
        ajax: 0,
        showview: 0,
        viewmodel: "",
      };
    },
    editfield(scope) {
      console.log(scope);
      this.fieldchangeseq = scope.$index;

      var vk = this.getDefaultField();
      var fieldinfo = this.modelinfo.fields.field[scope.$index];

      const object2 = Object.assign(vk, fieldinfo);
      this.fieldinfo = object2;
      console.log("fieldinfo", this.fieldinfo);
      this.showfieldedit = true;
    },
    addselectoption() {
      this.fieldinfo.options.option.push({ name: "", value: "", color: "" });
    },
    addnewservice() {
      this.modelinfo.options.option.push({
        name: "",
        type: "",
        function: "",
        detail: 0,
        search: 0,
        description: "",
      });
    },
    addnewcharts() {
      if (this.modelinfo.charts.chart == "") {
        this.modelinfo.charts.chart = [];
      }
      this.modelinfo.charts.chart.push({
        name: "",
        type: "",
        field: "",
        datetimefield: "",
        numberfield: "",
        statusfield: "",
        description: "",
      });
    },
    savemodel(alsoupdate=false) {
      HttpHelper.Post("model/save", {
        appalias: this.appinfo.alias,
        modelname: this.modelname,
        model: JSON.stringify(this.modelinfo),
      }).then((ret) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        if(alsoupdate==true){
          this.updatedb();
        }
      });
    },
    updatedb() {
      HttpHelper.Post("model/updatedb", {
        appalias: this.appinfo.alias,
        modelname: this.modelname,
      }).then((data) => {
        if (data.code == 0) {
          this.$message({
            message: "数据库更新成功",
            type: "success",
          });
        } else {
          var ret = "";
          for (var i = 0; i < data.return.length; i++) {
            ret += "<p>" + data.return[i] + "</p>";
          }
          this.$alert(ret, "HTML 片段", {
            dangerouslyUseHTMLString: true,
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.fieldtable .cell {
  text-align: center !important;
}
</style>