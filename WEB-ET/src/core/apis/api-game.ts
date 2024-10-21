/*
 * @Date: 2024-08-21 10:32:58
 * @FilePath: /AS-WEB-3.5/src/core/apis/api-game.ts
 * @Description:
 */

export default {
  // 获取游戏大厅列表
  ['rest/game-list']:
    'api/game/h5list?platform_id=$&per_page=$&cate_id=$&page=$&is_hot=$&game_type=$',

  // 获取游戏大厅地址
  ['rest/gameplay-url']: 'api/game/$/playurl?autoYhrad=$&h5judge=$&id=$',

  // 获取游戏是否关闭
  ['rest/get-game-status']: 'api/game/status',
}
