/** *
 * 1.首先是前序的第一个字符是中序的的中心
 * 2.中序左边为左子树，右边为右子树
 * 3.左子树的
 * 
 * 
 **/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// ac地址：https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/
// 原文地址：https://xxoo521.com/2019-12-21-re-construct-btree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }

  const rootVal = preorder[0];
  const node = new TreeNode(rootVal);

  let i = 0; // i有两个含义，一个是根节点在中序遍历结果中的下标，另一个是当前左子树的节点个数
  for (; i < inorder.length; ++i) {
    if (inorder[i] === rootVal) {
      break;
    }
  }

  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return node;
};